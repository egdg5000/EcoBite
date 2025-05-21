const dotenv = require('dotenv').config()
const { db } = require('../database')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path')
const {emailTransporter} = require('../smtp.js');

async function registerUser(req, res){
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({success: false, message: 'Username, email, and password are required'});
    }
    const duplicateCheck = await checkDuplicates(username, email);
    if (duplicateCheck.usernameExists && duplicateCheck.emailExists) {
        return res.status(400).json({success: false, message: 'Username and email already in use'});
    }
    if (duplicateCheck.usernameExists) {
        return res.status(400).json({success: false, message: 'Username already in use'});
    }
    if (duplicateCheck.emailExists) {
        return res.status(400).json({success: false, message: 'Email already in use'});
    }
    const hashedpassword = await hashpassword(password);
    const signupDate = new Date();

    const emailToken = jwt.sign({
        email: email
    }, process.env.SESSION_SECRET, { expiresIn: '1h' });
    const verificationUrl = `https://edg5000.com/verification?token=${emailToken}`;
    const mailOptions = {
        from: 'ecobite@edg5000.com',
        to: email,
        subject: 'Verify Your Email',
        html: require('fs').readFileSync(path.join(__dirname, '../public/verification_email.html'), 'utf8').replace('{{ verificationUrl }}', verificationUrl)
    };
    await emailTransporter.sendMail(mailOptions);
    const expiration = new Date(new Date().setHours(new Date().getHours() + 1))

    const query = `INSERT INTO users (username, email, password_hash, signup_date, last_signin, verification_token, verification_expires) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    await db.promise().query(query, [username, email, hashedpassword, signupDate, signupDate, emailToken, expiration]);
    req.session.isLoggedIn = true;
    req.session.user = username;
    return res.status(200).json({success: true, message: 'Account registered'});
}

async function checkDuplicates(username, email) {
    const query = `SELECT * FROM users WHERE username = ?`;
    const [usernameResult] = await db.promise().query(query, [username]);
    const query2 = `SELECT * FROM users WHERE email = ?`;
    const [emailResult] = await db.promise().query(query2, [email]);
    
    return {
        usernameExists: usernameResult.length !== 0,
        emailExists: emailResult.length !== 0
    };
}

async function loginUser(req, res) {
    if (req.session.isLoggedIn){
        return res.status(401).json({success: false, message: 'User already logged in'});
    }
    const {username, password} = req.body;
    if (!username || !password){
        return res.status(400).send('Username or email and password are required');
    }
    let query = `SELECT * FROM users WHERE username = ? OR email = ?`;
    const [result] = await db.promise().query(query, [username, username]);
    if (result.length === 0) {
        return res.status(401).json({success: false, message: 'Username or email not found'});
    }
    const storedPassword = result[0].password_hash;
    const isMatch = await bcrypt.compare(password, storedPassword);
    if (!isMatch) {
        return res.status(401).json({success: false, message: 'Incorrect password'});
    };
    const lastSignUp = new Date();
    const query_ = `UPDATE users SET last_signin = ? WHERE username = ? OR email = ?`;
    await db.promise().query(query_, [lastSignUp, username, username]);
    req.session.isLoggedIn = true;
    req.session.user = result[0].username;
    req.session.userId = result[0].id;
    console.log(req.session);
    return res.status(200).json({success: true, message: `Login successful, Welcome ${req.session.user}`});
}

async function hashpassword(password) {
    return bcrypt.hash(password, 10);
}

async function loginStatus(req, res, next) {
    if (req.session && req.session.isLoggedIn) {
        try {
            const lastSignIn = new Date();
            const query_ = `UPDATE users SET last_signin = ? WHERE id = ?`;
            await db.promise().query(query_, [lastSignIn, req.session.userId]);
            // If next is provided, call it, otherwise send success response
            if (typeof next === 'function') {
                return next();
            }
            return res.status(200).json({success: true, message: 'User is logged in'});
        } catch (err) {
            console.error(err);
            return res.status(500).json({success: false, message: 'Internal Server Error'});
        }
    } else {
        return res.status(200).json({success: false, message: 'User is not logged in'});
    }
}

module.exports = {
    registerUser,
    loginUser,
    loginStatus
}