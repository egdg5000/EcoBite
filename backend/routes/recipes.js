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


module.exports = router;