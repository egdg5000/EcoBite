const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logout } = require('../functions/userdb');
var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

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

router.post('/logout', (req,res) => {
    logout(req, res).catch(err => {
        console.error(err);
        res.status(500).json({success: false, message: 'Internal Server Error'})
    })
});

router.get('/loginStatus', (req, res) => {
    if (req.session.isLoggedIn) {
        res.status(200).json({success: true, message: 'User is logged in'})
    } else{
        res.status(200).json({success: false, message: 'User is not logged in'})
    }
})
module.exports = router;