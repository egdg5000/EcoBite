const express = require('express');
const { randomBytes } = require('crypto'); 
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

router.get('/recovery', (req, res) => {
    res.sendFile(path.join(__dirname + '/../public/password_recovery.html'))
});

router.post('/sendrecoverymail', jsonParser, (req, res) => {
    const {email} = req.body
    console.log(email);
    const query = `SELECT * FROM users WHERE email = ?`;
    db.promise().query(query, email).then(([result]) => {
        if (result.length === 0) {
            res.status(404).json({success: false, message: 'Email not found'});
        }
        if (!result[0].email_verified){
            res.status(400).json({success: false, message: 'Email not verified'});
        }
        const userid = result[0].id
        const token = randomBytes(20).toString('base64').replace(/[^a-zA-Z0-9]/g, '')
        const query1 = `UPDATE users SET recovery_token = ? WHERE id = ?`;
        db.promise().query(query1, [token, userid]);
        const recoveryUrl = `http://localhost:3000/recovery?token=${token}`;
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Reset your password',
            html: require('fs').readFileSync(path.join(__dirname, '../public/recovery_email.html'), 'utf8').replace('{{ recoveryUrl }}', recoveryUrl)
        };
        emailTransporter.sendMail(mailOptions);
    }).catch(err => {
        console.error(err);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    });
});
module.exports = router;