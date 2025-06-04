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

router.get('/loginStatus', loginStatus, (req, res) => {
    res.status(200).json({success: true, message: 'User is logged in'})
});

router.post('/logout', loginStatus, (req, res) => {
    req.session.destroy();
    res.status(200).json({success: true, message: 'User is logged out'})
})

// router.post("/save-push-token", async (req, res) => {
//   const { user_id, push_token } = req.body;
//   try {
//     await db
//       .promise()
//       .query("UPDATE users SET push_token = ? WHERE id = ?", [
//         push_token,
//         user_id,
//       ]);
//     res.json({ success: true });
//   } catch (err) {
//     console.error("Fout bij opslaan push-token:", err);
//     res.status(500).json({ success: false });
//   }
// });

router.get("/preferences", loginStatus, async (req, res) => {
  const userId = req.session.userId;

  try {
    const [rows] = await db
      .promise()
      .query("SELECT notify_expiry, notify_deletion FROM users WHERE id = ?", [userId]);
    res.json(rows[0]);
  } catch (err) {
    console.error("Fout bij ophalen voorkeuren:", err);
    res.status(500).json({});
  }
});

router.post("/preferences/save", async (req, res) => {
  const { user_id, notify_expiry, notify_deletion } = req.body;

  try {
    await db
      .promise()
      .query(
        "UPDATE users SET notify_expiry = ?, notify_deletion = ? WHERE id = ?",
        [notify_expiry, notify_deletion, user_id]
      );
    res.json({ success: true });
  } catch (err) {
    console.error("Fout bij opslaan voorkeuren:", err);
    res.status(500).json({ success: false });
  }
});

router.get('/profile', async (req, res) => {
  if (!req.session.user) return res.status(401).json({ message: 'Niet ingelogd' });

  const [rows] = await db.query('SELECT username, email, phone FROM users WHERE id = ?', [req.session.user.id]);
  if (rows.length === 0) return res.status(404).json({ message: 'Gebruiker niet gevonden' });

  res.json(rows[0]);
});

router.put('/profile', async (req, res) => {
  const userId = req.session?.userId;
  if (!userId) {
    return res.status(401).json({ message: 'Niet ingelogd' });
  }

  const { username, email, phone } = req.body;

  if (!username || !email) {
    return res.status(400).json({ message: 'Gebruikersnaam en e-mailadres zijn verplicht.' });
  }

  try {
    const [existing] = await db.query(
      'SELECT id FROM users WHERE email = ? AND id != ?',
      [email, userId]
    );

    if (existing.length > 0) {
      return res.status(409).json({ message: 'Email bestaat al' });
    }

    await db.query(
      'UPDATE users SET username = ?, email = ?, phone = ? WHERE id = ?',
      [username, email, phone || null, userId]
    );

    return res.json({ message: 'Account bijgewerkt' });
  } catch (err) {
    console.error('Fout bij bijwerken profiel:', err);
    return res.status(500).json({ message: 'Serverfout' });
  }
});

// PUT /users/preferences
router.put('/preferences', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Niet ingelogd' });
  }

  const userId = req.session.user.id;
  const { allergies } = req.body;

  try {
    // Check of profiel al bestaat
    const [existing] = await db.query('SELECT * FROM user_profiles WHERE user_id = ?', [userId]);

    if (existing.length > 0) {
      await db.query('UPDATE user_profiles SET allergies = ? WHERE user_id = ?', [JSON.stringify(allergies), userId]);
    } else {
      await db.query('INSERT INTO user_profiles (user_id, allergies) VALUES (?, ?)', [userId, JSON.stringify(allergies)]);
    }

    res.json({ success: true });
  } catch (err) {
    console.error('Fout bij opslaan voorkeuren:', err);
    res.status(500).json({ message: 'Serverfout bij opslaan voorkeuren' });
  }
});

router.get('/preferences', async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: 'Niet ingelogd' });
  }

  const userId = req.session.user.id;

  try {
    const [rows] = await db.query('SELECT allergies FROM user_profiles WHERE user_id = ?', [userId]);

    if (rows.length === 0) {
      return res.json({ allergies: [] });
    }

    const allergies = JSON.parse(rows[0].allergies || '[]');
    res.json({ allergies });
  } catch (error) {
    console.error('Fout bij ophalen voorkeuren:', error);
    res.status(500).json({ message: 'Serverfout' });
  }
});

module.exports = router;