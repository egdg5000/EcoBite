const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../functions/userdb');
const bodyParser = require('body-parser');
const { db } = require('../database');

const jsonParser = bodyParser.json();


router.post('/register', jsonParser, (req, res) => {
    registerUser(req, res).catch(err => {
        console.error(err);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    });
  });

router.post('/login', jsonParser, (req, res) => {
    loginUser(req, res).catch(err => {
        console.error(err);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    })
});

router.get('/loginStatus', (req, res) => {
    if (req.session.isLoggedIn) {
        const lastSignIn = new Date();
        const query_ = `UPDATE users SET last_signin = ? WHERE username = ?`;
        db.promise().query(query_, [lastSignIn, req.session.user]).then(() => {
            res.status(200).json({success: true, message: 'User is logged in'})
        }).catch(err => {
            console.error(err);
            res.status(500).json({success: false, message: 'Internal Server Error'});
        });
    } else{
        res.status(200).json({success: false, message: 'User is not logged in'})
    }
})
module.exports = router;