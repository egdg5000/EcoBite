const express = require("express");
const router = express.Router();
const db = require("../database");

// ➕ Voeg nieuw product toe
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

// 📥 Haal alle niet-verlopen producten van gebruiker op
router.get("/user/:id", async (req, res) => {
  const userId = req.params.id;
  const today = new Date().toISOString().split("T")[0];

  try {
    const [rows] = await db
      .promise()
      .query(
        "SELECT * FROM inventory WHERE user_id = ? AND expiration_date >= ? ORDER BY expiration_date ASC",
        [userId, today]
      );
    res.json({ products: rows });
  } catch (err) {
    console.error("Fout bij ophalen producten:", err);
    res.status(500).json({ message: "Databasefout" });
  }
});

// 🧹 Verwijder verlopen producten & log ze in deleted_inventory
router.delete("/expired/cleanup", async (_req, res) => {
  const today = new Date().toISOString().split("T")[0];

  try {
    // 1. Haal verlopen producten op
    const [expiredProducts] = await db
      .promise()
      .query("SELECT * FROM inventory WHERE expiration_date < ?", [today]);

    if (expiredProducts.length === 0) {
      return res.json({ success: true, removed: 0 });
    }

    // 2. Sla ze op in deleted_inventory
    for (const product of expiredProducts) {
      await db.promise().query(
        `INSERT INTO deleted_inventory 
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

    // 3. Verwijder ze uit inventory
    const [deleteResult] = await db
      .promise()
      .query("DELETE FROM inventory WHERE expiration_date < ?", [today]);

    res.json({ success: true, removed: deleteResult.affectedRows });
  } catch (err) {
    console.error("Fout bij cleanup verlopen producten:", err);
    res.status(500).json({ success: false });
  }
});

// 🗑️ Verwijder handmatig een product
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

// 🔍 Haal laatste verwijderde producten op
router.get("/deleted/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const [rows] = await db
      .promise()
      .query(
        `SELECT item_name, deleted_at, category 
         FROM deleted_inventory 
         WHERE user_id = ? 
         ORDER BY deleted_at DESC 
         LIMIT 10`,
        [userId]
      );
    res.json({ deleted: rows });
  } catch (err) {
    console.error("Fout bij ophalen verwijderde producten:", err);
    res.status(500).json({ deleted: [] });
  }
});

module.exports = router;