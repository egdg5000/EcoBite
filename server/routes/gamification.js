const express = require('express');
const router = express.Router();
const { getProgress, addXpForRecipe } = require('../functions/gamificationdb');

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

module.exports = router;
