const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { db } = require('../database');
const path = require('path')

const jsonParser = bodyParser.json();

router.get('/verification', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/verify_email.html'))
});

router.post('/verify', jsonParser, (req, res) => {
    const currentTime = new Date();
    const {token} = req.body
    if (token === null) {res.status(400).json({success: false, message:"Invalid token"}); return;}
    const query = `SELECT * FROM users WHERE verification_token = ?`;
    db.promise().query(query, token).then(([result]) => {
        if (result.length > 0) {
            if (currentTime > new Date(result[0].verification_expires)) {
                res.status(400).json({success: false, message: "Verification token expired"}); 
                return;
            }
            else {
                const query_ = `UPDATE users SET verification_token = NULL, email_verified = TRUE, verification_expires = NULL WHERE verification_token = ?`;
                db.promise().query(query_, token).then(() => {
                    res.status(200).json({success: true, message: 'E-mail verified'})
                }).catch(err => {
                    console.error(err);
                    res.status(500).json({success: false, message: 'Internal Server Error'});
                });
            }
        } else res.status(400).json({success: false, message: 'E-mail already verified'})
    }).catch(err => {
        console.error(err);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    });
})

module.exports = router;