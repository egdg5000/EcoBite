const express = require('express');
const router = express.Router();
const { getProgress, addXpForRecipe } = require('../functions/gamificationdb');
const db = require('../database');
const { getRandomChallenges } = require('../functions/challenges');

router.get('/profile', async (req, res) => {
  const { userId } = req.params;
  try {
    const progress = await getProgress(userId);
    res.json(progress);
  } catch (err) {
    console.error('Fout bij ophalen gamification:', err);
    res.status(500).json({ message: 'Fout bij gamification ophalen' });
  }
});

router.post('/add-xp', async (req, res) => {
  const { userId, recipeId } = req.body;
  try {
    const result = await addXpForRecipe(userId, recipeId);
    res.json(result);
  } catch (err) {
    console.error('Fout bij XP toevoegen:', err);
    res.status(500).json({ message: 'Fout bij XP toevoegen' });
  }
});

router.get('/leaderboard', async (req, res) => {
  res.status(200).json({success: true, data: []});
  try {
    const [rows] = await db.query(`
      SELECT users.username, g.xp
      FROM users_gamification g
      JOIN users ON users.id = g.user_id
      ORDER BY g.xp DESC
      LIMIT 10
    `);
    res.json(rows);
  } catch (err) {
    console.error('Leaderboard fout:', err);
    res.status(500).json({ message: 'Kon leaderboard niet laden' });
  }
});

function getWeekStart() {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); 
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split("T")[0]; 
}

router.get('/challenges/weekly', async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const [rows] = await getRandomChallenges(3);

    res.json(rows);
  } catch (err) {
    console.error("Fout bij ophalen challenges:", err);
    res.status(500).json({ error: "Serverfout bij ophalen challenges" });
  }
});

router.post("/challenges/complete", async (req, res) => {
  const { userId, challengeId } = req.body;
  const weekStart = getWeekStart(); 

  try {
    const [existing] = await db.promise().query(
      `SELECT * FROM user_challenges WHERE user_id = ? AND challenge_id = ? AND week_start = ?`,
      [userId, challengeId, weekStart]
    );

    if (existing.length > 0) {
      return res.status(400).json({ success: false, message: 'Challenge deze week al voltooid' });
    }

    await db.promise().query(
      `UPDATE users SET xp = xp + 50 WHERE id = ?`,
      [userId]
    );

    await db.promise().query(
      `INSERT INTO user_challenges (user_id, challenge_id, week_start) VALUES (?, ?, ?)`,
      [userId, challengeId, weekStart]
    );

    res.json({ success: true, message: 'Challenge voltooid en XP toegekend' });
  } catch (err) {
    console.error("Challenge voltooi-fout:", err);
    res.status(500).json({ success: false, message: 'Serverfout' });
  }
});


module.exports = router;
