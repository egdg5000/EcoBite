const db = require('../database');

function getXpForNextLevel(level) {
  return 100 + (level - 1) * 50; // Lineaire groei
}

async function getProgress(userId) {
  const [rows] = await db.query(
    'SELECT level, xp, co2_saved, streak_days FROM users_gamification WHERE user_id = ?',
    [userId]
  );
  const row = rows[0] || { level: 1, xp: 0, co2_saved: 0, streak_days: 0 };
  return {
    user_id: userId,
    level: row.level,
    xp: row.xp,
    co2_saved: row.co2_saved,
    streak_days: row.streak_days || 0,
    xp_for_next_level: getXpForNextLevel(row.level),
  };
}

async function addXpForRecipe(userId, earnedXp) {
  const [rows] = await db.query(
    'SELECT level, xp FROM users_gamification WHERE user_id = ?',
    [userId]
  );
  let level = 1;
  let xp = 0;

  if (rows.length > 0) {
    level = rows[0].level;
    xp = rows[0].xp;
  }

  xp += earnedXp;
  let nextLevelXp = getXpForNextLevel(level);
  while (xp >= nextLevelXp) {
    xp -= nextLevelXp;
    level++;
    nextLevelXp = getXpForNextLevel(level);
  }

  await db.query(
    'INSERT INTO users_gamification (user_id, level, xp) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE level = ?, xp = ?',
    [userId, level, xp, level, xp]
  );

  return { level, xp, xp_for_next_level: nextLevelXp };
}

async function updateCo2(userId, newValue) {
  await db.query(
    'UPDATE users_gamification SET co2_saved = ? WHERE user_id = ?',
    [newValue, userId]
  );
}

async function getLeaderboard() {
  const [rows] = await db.query(`
    SELECT users.username, g.xp
    FROM users_gamification g
    JOIN users ON users.id = g.user_id
    ORDER BY g.xp DESC
    LIMIT 10
  `);
  return rows;
}

module.exports = {
  getProgress,
  addXpForRecipe,
  updateCo2,
  getLeaderboard,
};