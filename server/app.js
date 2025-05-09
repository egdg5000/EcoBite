const express = require('express')
const session = require('express-session');
const cors = require('cors')
const app = express();
const port = 3000;
const dotenv = require('dotenv').config()
const MySQLStore = require('express-mysql-session')(session);
const helmet = require('helmet');

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


app.listen(port, () => {
  console.log(`server listening on port ${port}`)
});