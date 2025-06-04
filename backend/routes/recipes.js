const express = require('express');
const router = express.Router();
const db = require('../database');

async function findRecipesByIngredients(ingredients) {
  const names = ingredients.map((item) => item.name.toLowerCase());

  const [rows] = await db.query(`
    SELECT * FROM recipes
    WHERE JSON_CONTAINS(LOWER(JSON_EXTRACT(ingredients, '$[*].name')), JSON_QUOTE(?))
  `, [names[0]]); 

  return rows;
}

router.post('/by-category', async (req, res) => {
  const { category } = req.body;

  try {
    const [rows] = await db.promise().query(
      'SELECT * FROM recipes WHERE category = ?',
      [category]
    );

    res.json({ recipes: rows });
  } catch (err) {
    console.error('Fout bij ophalen recepten per categorie:', err);
    res.status(500).json({ error: 'Serverfout' });
  }
});

module.exports = router;
