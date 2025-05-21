const express = require('express');
const router = express.Router();
const { registerUser, loginUser, loginStatus } = require('../functions/userdb');
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
    loginStatus(req, res).then(() => {
        res.status(200).json({success: true, message: 'User is logged in'})
    }).catch(err => {
        console.error(err);
        res.status(500).json({success: false, message: 'Internal Server Error'});
    })
})

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({success: true, message: 'User is logged out'})
})

router.post("/save-push-token", async (req, res) => {
  const { user_id, push_token } = req.body;
  try {
    await db
      .promise()
      .query("UPDATE users SET push_token = ? WHERE id = ?", [
        push_token,
        user_id,
      ]);
    res.json({ success: true });
  } catch (err) {
    console.error("Fout bij opslaan push-token:", err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;