const express = require('express')
const session = require('express-session');
const cors = require('cors')
const app = express();
const port = 3000;
const dotenv = require('dotenv').config()
const MySQLStore = require('express-mysql-session')(session);
const helmet = require('helmet');
const recipeRoutes = require('./routes/recipes');
const aiRoutes = require('./routes/ai');


require('dotenv').config();

app.use(express.json({ limit: "50mb" }));

app.use(cors({
  origin: ['https://edg5000.com', 'http://localhost:8081'],
  credentials: true
}));

app.use(helmet());

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
    },
  })
);

const sessionStore = new MySQLStore({
  host: 'localhost',
	port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.SESSION_DB
});

app.use(session({
	key: 'session_cookie_name',
	secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
  }
}));

app.use(express.static(__dirname + '/public'));

sessionStore.onReady().then(() => {
	console.log('MySQLSessionStore ready');
}).catch(error => {
	console.error(error);
});

//Routes
app.use("/users", require('./routes/users.js'));
app.use("/", require('./routes/index.js'));
app.use("/products", require('./routes/products.js'));
app.use("/scan", require('./routes/scan.js'));
app.use('/recipes', recipeRoutes);
app.use('/ai', aiRoutes);

const cron = require("node-cron");
const axios = require("axios");
const sendPushNotification = require("./utils/push");

cron.schedule("0 2 * * *", async () => {
  console.log("Dagelijkse opruimactie gestart");
  try {
    await axios.delete("http://localhost:3000/products/expired/cleanup");
    console.log("Verlopen producten automatisch verwijderd");
  } catch (err) {
    console.error("Fout bij automatisch opruimen:", err);
  }
});

cron.schedule("0 3 * * *", async () => {
  const today = new Date();
  const tomorrow = new Date(today);
  const nextWeek = new Date(today);

  tomorrow.setDate(today.getDate() + 1);
  nextWeek.setDate(today.getDate() + 7);

  const format = (d) => d.toISOString().split("T")[0];
  const expDates = [format(tomorrow), format(nextWeek)];

  try {
    const [rows] = await db
      .promise()
      .query(
        `SELECT i.item_name, i.expiration_date, u.push_token 
         FROM inventory i
         JOIN users u ON i.user_id = u.id
         WHERE i.expiration_date IN (?, ?) AND u.push_token IS NOT NULL`,
        expDates
      );

    for (const item of rows) {
      const days =
        item.expiration_date === format(tomorrow) ? "morgen" : "over 7 dagen";
      const message = `${item.item_name} verloopt ${days}`;
      await sendPushNotification(item.push_token, "Houdbaarheid", message);
    }
  } catch (err) {
    console.error("Cron-notificatie fout:", err);
  }
});

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
});