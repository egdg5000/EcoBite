const db = require('../database');

async function getProgress(userId) {
  const [rows] = await db.query('SELECT * FROM users_gamification WHERE user_id = ?', [userId]);

  if (rows.length === 0) {
    // Eerste keer? Init record
    await db.query('INSERT INTO users_gamification (user_id) VALUES (?)', [userId]);
    return { user_id: userId, level: 1, xp: 0, co2_saved: 0.0 };
  }

  return rows[0];
}

async function addXpForRecipe(userId, recipeId) {
  // Voeg 50 XP en 0.3 kg CO₂ toe per recept als voorbeeld
  const XP_GAIN = 50;
  const CO2_GAIN = 0.3;

  await db.query(`
    INSERT INTO users_gamification (user_id, xp, co2_saved)
    VALUES (?, ?, ?)
    ON DUPLICATE KEY UPDATE
      xp = xp + VALUES(xp),
      co2_saved = co2_saved + VALUES(co2_saved)
  `, [userId, XP_GAIN, CO2_GAIN]);

  // Check level-up logica
  const [rows] = await db.query('SELECT xp, level FROM users_gamification WHERE user_id = ?', [userId]);
  let { xp, level } = rows[0];

  const XP_PER_LEVEL = 100;

  while (xp >= level * XP_PER_LEVEL) {
    xp -= level * XP_PER_LEVEL;
    level++;
  }

  await db.query('UPDATE users_gamification SET level = ?, xp = ? WHERE user_id = ?', [level, xp, userId]);

  return { level, xp, co2_saved: CO2_GAIN };
}

module.exports = {
  getProgress,
  addXpForRecipe,
};

function getXpForNextLevel(level) {
  // bijv. 100 * level (lineair), of iets uitdagender
  return 100 + (level - 1) * 50; // Level 1: 100 XP, Level 2: 150 XP, Level 3: 200 XP, etc.
}
