const { db } = require('../database')
const bcrypt = require('bcrypt');


async function registerUser(username, email, password){
    const check = await checkDuplicates(username, email);
    switch(check) {
        case 0:
            password = await hashpassword(password);
            const query = `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`;
            await db.promise().query(query, [username, email, password])
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

async function loginUser(req, res) {
    const {username, password} = req.body;
    let query = `SELECT * FROM users WHERE username = ? OR email = ?`;
    const [result] = await db.promise().query(query, [username, username]);
    if (result.length === 0) {
        return res.status(401).json({success: false, message: 'Username or email not found'});
    }
    const storedPassword = result[0].password;
    const isMatch = await bcrypt.compare(password, storedPassword);
    if (!isMatch) {
        return res.status(401).json({success: false, message: 'Incorrect password'});
    };
    req.session.isLoggedIn = true;
    req.session.user = result[0].username;
    console.log(req.session);
    return res.status(200).json({success: true, message: `Login successful, Welcome ${req.session.user}`});
}

async function hashpassword(password) {
    return bcrypt.hash(password, 10);
}


module.exports = {
    registerUser,
    loginUser,
}