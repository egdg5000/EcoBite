const db = require('../database');

// Vind recepten die overeenkomen met opgegeven ingrediënten
async function findRecipesByIngredients(ingredients) {
  const names = ingredients.map((item) => item.name.toLowerCase());

  const [rows] = await db.query(`
    SELECT * FROM recipes
    WHERE JSON_CONTAINS(LOWER(JSON_EXTRACT(ingredients, '$[*].name')), JSON_QUOTE(?))
  `, [names[0]]); // Eenvoudige versie met 1 ingrediënt (uitbreidbaar)

  return rows;
}

module.exports = {
  findRecipesByIngredients,
};