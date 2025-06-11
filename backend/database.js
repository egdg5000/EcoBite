const mysql = require('mysql2');
const dotenv = require('dotenv').config()


const db = mysql.createConnection({
    host: 'localhost',
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });
  
  db.connect((err) => {
    if (err) throw err;
    console.log('Connected to database');
  });

  
module.exports = { db };
  