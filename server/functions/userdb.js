const { db } = require('../database')
const bcrypt = require('bcrypt');


async function registerUser(username, email, password){
    const check = await checkDuplicates(username, email);
    console.log(check);
    switch(check) {
        case 0:
            password = await hashpassword(password);
            const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
            const result = await db.promise().query(query, [username, email, password])
            return "Account registered";
        case 1:
            return "Username already in use";
        case 2:
            return "Email already in use";
    }
}

async function checkDuplicates(username, email) {
    const query = `SELECT * FROM users WHERE username = ?`;
    const [result] = await db.promise().query(query, [username]);
    if (result.length != 0){
        return (1);
    }
    const query2 = `SELECT * FROM users WHERE email = ?`;
    const [result2] = await db.promise().query(query2, [email])
    if (result2.length != 0){
        return (2);
    }
    return (0);
}

async function hashpassword(password) {
    return bcrypt.hash(password, 10);
}


module.exports = {
    registerUser
}