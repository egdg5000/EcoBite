const express = require('express');
const router = express.Router();
const { db } = require('../database');

async function findRecipesByIngredients(ingredients) {
  const names = ingredients.map(name => name.toLowerCase());
  const recipeIds = [];
  
  for (const name of names) {
    const [rows] = await db.promise().query(`
      SELECT recipe_id FROM ingredients WHERE \`name.singular\` = ?
    `, [name]); 
    
    for (const row of rows) {
      const existingRecipe = recipeIds.find(recipe => recipe.recipe_id === row.recipe_id);
      if (existingRecipe) {
        existingRecipe.contains = [...existingRecipe.contains, name];
        existingRecipe.count = new Set(existingRecipe.contains).size;
      } else {
        recipeIds.push({ 
          recipe_id: row.recipe_id, 
          contains: [name],
          count: 1
        });
      }
    }
  }

  return recipeIds;
}

router.get('/by-ingredients', async (req, res) => {
  try {
    const userId = req.session.userId;
    const [rows] = await db.promise().query(
      `SELECT * FROM user_products WHERE user_id = ?`,
      [userId]
    );
    const ingredients = rows.map((item) => item.item_name);
    const recipes = await findRecipesByIngredients(ingredients);
    res.status(200).json({ success: true, recipes });
  } catch (err) {
    console.error('Fout bij ophalen recepten:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

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
