const db = require('../database');

function getXpForNextLevel(level) {
  return 100 + (level - 1) * 50; 
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
    'SELECT level, xp, streak_days, last_activity, co2_saved FROM users_gamification WHERE user_id = ?',
    [userId]
  );

  let level = 1;
  let xp = 0;
  let streak = 0;
  let lastActivity = null;
  let co2_saved = 0;

  if (rows.length > 0) {
    level = rows[0].level;
    xp = rows[0].xp;
    streak = rows[0].streak_days || 0;
    lastActivity = rows[0].last_activity;
    co2_saved = rows[0].co2_saved || 0;
  }

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const todayStr = today.toISOString().split('T')[0];
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  if (lastActivity) {
    const lastDateStr = lastActivity.toISOString().split('T')[0];
    const diffDays = Math.floor((today - new Date(lastDateStr)) / (1000 * 60 * 60 * 24));

    if (diffDays > 1) {
      streak = 1;
      const verliesPerDag = 50; 
      const totaalVerlies = verliesPerDag * (diffDays - 1);
      const effectiefVerlies = Math.min(co2_saved, totaalVerlies);
      co2_saved = Math.max(0, co2_saved - effectiefVerlies);
      console.log(`Gebruiker ${userId} verloor ${effectiefVerlies}g CO₂ na ${diffDays - 1} dagen inactiviteit.`);
    } else if (lastDateStr === yesterdayStr) {
      streak += 1;
    } else if (lastDateStr === todayStr) {
    } else {
      streak = 1;
    }
  } else {
    streak = 1;
  }

  xp += earnedXp;
  let nextLevelXp = getXpForNextLevel(level);
  while (xp >= nextLevelXp) {
    xp -= nextLevelXp;
    level++;
    nextLevelXp = getXpForNextLevel(level);
  }

  await db.query(
    'INSERT INTO users_gamification (user_id, level, xp, streak_days, last_activity, co2_saved) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE level = ?, xp = ?, streak_days = ?, last_activity = ?, co2_saved = ?',
    [userId, level, xp, streak, todayStr, co2_saved, level, xp, streak, todayStr, co2_saved]
  );

  return { level, xp, xp_for_next_level: nextLevelXp, streak_days: streak, co2_saved };
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
