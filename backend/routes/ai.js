const express = require('express');
const router = express.Router();
const { getAISuggestions } = require('../functions/aidb');

router.post('/recipe-suggestions', async (req, res) => {
  const { ingredients } = req.body;
  if (!ingredients || !Array.isArray(ingredients)) {
    return res.status(400).json({ message: 'Ongeldige ingrediënten' });
  }

  try {
    const suggestions = await getAISuggestions(ingredients);
    res.json({ suggestions });
  } catch (err) {
    console.error('AI fout:', err);
    res.status(500).json({ message: 'Suggestie mislukt' });
  }
});

module.exports = router;
