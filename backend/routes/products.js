const express = require("express");
const router = express.Router();
const {db} = require("../database");
const { loginStatus } = require("../functions/userdb");

router.post("/suggestions", loginStatus, async (req, res) => {
  const { item_name } = req.body;
  if (!item_name) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }
  const [rows] = await db.promise().query(
    `SELECT MIN(id) as id, 
     \`name.singular\`,
     CASE 
       WHEN \`name.singular\` = ? THEN 1
       WHEN \`name.singular\` LIKE ? THEN 2
       ELSE 3
     END as relevance
     FROM ingredients 
     WHERE \`name.singular\` LIKE ? 
     GROUP BY \`name.singular\`
     ORDER BY relevance ASC, \`name.singular\` ASC
     LIMIT 10`,
    [item_name, `${item_name}%`, `%${item_name}%`]
  );
  if (rows.length === 0) {
    return res.status(400).json({ success: false, message: "No products found" });
  }
  res.status(200).json({ success: true, message: "Producten opgehaald", products: rows });
});

router.post("/add", loginStatus, async (req, res) => {
  const {item_name, quantity, unit, expiration_date, category } = req.body;
  if (!item_name || !quantity || !unit || !category) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }
  if (expiration_date && expiration_date < new Date().toISOString().split("T")[0]) {
    return res.status(400).json({ success: false, message: "Expiration date cannot be in the past" });
  }
  const newDate = expiration_date ? new Date(expiration_date).toISOString().split("T")[0] : null;
  try {
    const [result] = await db
      .promise()
      .query(
        `INSERT INTO user_products (user_id, item_name, quantity, unit, expiration_date, category)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [req.session.userId, item_name, quantity, unit, newDate, category]
      );
    res.status(200).json({ success: true, message: "Product toegevoegd", id: result.insertId });
  } catch (err) {
    console.error("Fout bij toevoegen product:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/inventory", loginStatus, async (req, res) => {
  const userId = req.session.userId;
  const today = new Date().toISOString().split("T")[0];

  try {
    const [rows] = await db
      .promise()
      .query(
        "SELECT * FROM user_products WHERE user_id = ? AND expiration_date >= ? ORDER BY expiration_date ASC",
        [userId, today]
      );
    res.status(200).json({ success: true, message: "Producten opgehaald", products: rows });
  } catch (err) {
    console.error("Fout bij ophalen producten:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.delete("/expired/cleanup", loginStatus, async (_req, res) => {
  const today = new Date().toISOString().split("T")[0];

  try {
    const [expiredProducts] = await db
      .promise()
      .query("SELECT * FROM user_products WHERE expiration_date < ?", [today]);

    if (expiredProducts.length === 0) {
      return res.status(200).json({ success: true, message: "Geen verlopen producten", removed: 0 });
    }

    for (const product of expiredProducts) {
      await db.promise().query(
        `INSERT INTO user_products_deleted 
         (user_id, item_name, quantity, unit, expiration_date, category)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          product.user_id,
          product.item_name,
          product.quantity,
          product.unit,
          product.expiration_date,
          product.category,
        ]
      );
    }

    const [deleteResult] = await db
      .promise()
      .query("DELETE FROM user_products WHERE expiration_date < ?", [today]);

    res.status(200).json({ success: true, message: "Verlopen producten verwijderd", removed: deleteResult.affectedRows });
  } catch (err) {
    console.error("Fout bij cleanup verlopen producten:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.delete("/delete/:productId", loginStatus, async (req, res) => {
  const productId = req.params.productId;

  try {
    await db.promise().query("DELETE FROM user_products WHERE id = ?", [productId]);
    res.status(200).json({ success: true, message: "Product verwijderd" });
  } catch (err) {
    console.error("Fout bij verwijderen product:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/deleted", loginStatus, async (req, res) => {
  const userId = req.session.userId;

  try {
    const [rows] = await db
      .promise()
      .query(
        `SELECT item_name, deleted_at, category 
         FROM user_products_deleted 
         WHERE user_id = ? 
         ORDER BY deleted_at DESC 
         LIMIT 10`,
        [userId]
      );
    res.status(200).json({ success: true, message: "Verwijderde producten opgehaald", deleted: rows });
  } catch (err) {
    console.error("Fout bij ophalen verwijderde producten:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;