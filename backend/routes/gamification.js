const express = require('express');
const router = express.Router();
const { getProgress, addXpForRecipe } = require('../functions/gamificationdb');
const db = require('../database');

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

router.get('/challenges/weekly', async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];

    const [rows] = await db
      .promise()
      .query(
        `SELECT id, challenge_text FROM weekly_challenges WHERE start_date <= ? AND end_date >= ?`,
        [today, today]
      );

    res.json(rows);
  } catch (err) {
    console.error("Fout bij ophalen challenges:", err);
    res.status(500).json({ error: "Serverfout bij ophalen challenges" });
  }
});

router.post("/challenges/complete", async (req, res) => {
  const { userId, challengeId } = req.body;
  // log voortgang, update XP
  await db.promise().query(`UPDATE users SET xp = xp + 50 WHERE id = ?`, [userId]);
  res.json({ success: true });
});

module.exports = router;
