const express = require('express')
const router = express.Router();
const { registerUser } = require('../functions/userdb')
var bodyParser = require('body-parser')

var jsonParser = bodyParser.json()


router.post('/register', jsonParser, (req, res) => {
    const { username, email, password } = req.body;
    registerUser(username, email, password).then(result => {
        res.send(result);
    }).catch(err => {
        console.error(err);
        res.status(500).send('Internal Server Error');
    });
  })

module.exports = router;