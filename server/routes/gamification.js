const express = require('express');
const router = express.Router();
const { getProgress, addXpForRecipe } = require('../functions/gamificationdb');
const db = require('../database');

// Haal gamification-gegevens van gebruiker op
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const progress = await getProgress(userId);
    res.json(progress);
  } catch (err) {
    console.error('Fout bij ophalen gamification:', err);
    res.status(500).json({ message: 'Fout bij gamification ophalen' });
  }
});

// Voeg XP toe als gebruiker een recept maakt
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

module.exports = router;
