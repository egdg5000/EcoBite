const express = require('express')
const session = require('express-session');
const app = express();
const port = 3000;
const dotenv = require('dotenv').config()

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
  }
}));

//Routes
app.use("/users", require("./routes/users.js"));


app.listen(port, () => {
  console.log(`server listening on port ${port}`)
});
