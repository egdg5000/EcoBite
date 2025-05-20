const express = require("express");
const router = express.Router();
const db = require("../database");

// ➕ POST: Product toevoegen
router.post("/add", async (req, res) => {
  const { user_id, item_name, quantity, unit, expiration_date, category } = req.body;

  try {
    const [result] = await db
      .promise()
      .query(
        `INSERT INTO inventory (user_id, item_name, quantity, unit, expiration_date, category)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, item_name, quantity, unit, expiration_date, category]
      );
    res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error("Fout bij toevoegen product:", err);
    res.status(500).json({ success: false, message: "Databasefout" });
  }
});

// 📥 GET: Producten ophalen per gebruiker (alleen niet-verlopen)
router.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const today = new Date().toISOString().split("T")[0];

  try {
    const [rows] = await db
      .promise()
      .query(
        `SELECT * FROM inventory 
         WHERE user_id = ? AND expiration_date >= ?
         ORDER BY expiration_date ASC`,
        [userId, today]
      );

    res.json({ products: rows });
  } catch (err) {
    console.error("Fout bij ophalen producten:", err);
    res.status(500).json({ message: "Databasefout" });
  }
});

// 🗑️ DELETE: Verwijder verlopen producten automatisch (bijv. dagelijks aanroepen)
router.delete("/expired/cleanup", async (_req, res) => {
  const today = new Date().toISOString().split("T")[0];
  try {
    const [result] = await db
      .promise()
      .query("DELETE FROM inventory WHERE expiration_date < ?", [today]);
    res.json({ success: true, removed: result.affectedRows });
  } catch (err) {
    console.error("Fout bij verwijderen verlopen producten:", err);
    res.status(500).json({ success: false });
  }
});

// 🧺 Verwijder specifiek product
router.delete("/delete/:productId", async (req, res) => {
  const productId = req.params.productId;
  try {
    await db.promise().query("DELETE FROM inventory WHERE id = ?", [productId]);
    res.json({ success: true });
  } catch (err) {
    console.error("Fout bij verwijderen product:", err);
    res.status(500).json({ success: false });
  }
});

module.exports = router;