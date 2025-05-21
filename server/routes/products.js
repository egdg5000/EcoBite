const express = require("express");
const router = express.Router();
const {db} = require("../database");

// ➕ Voeg nieuw product toe
router.post("/add", async (req, res) => {
  const {item_name, quantity, unit, expiration_date, category } = req.body;
  if (!item_name || !quantity || !unit || !category) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }
  if (expiration_date === "") {
    expiration_date = null;
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

// 📥 Haal alle niet-verlopen producten van gebruiker op
router.get("/inventory", async (req, res) => {
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

// 🧹 Verwijder verlopen producten & log ze in user_products_deleted
router.delete("/expired/cleanup", async (_req, res) => {
  const today = new Date().toISOString().split("T")[0];

  try {
    // 1. Haal verlopen producten op
    const [expiredProducts] = await db
      .promise()
      .query("SELECT * FROM user_products WHERE expiration_date < ?", [today]);

    if (expiredProducts.length === 0) {
      return res.status(200).json({ success: true, message: "Geen verlopen producten", removed: 0 });
    }

    // 2. Sla ze op in user_products_deleted
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

    // 3. Verwijder ze uit inventory
    const [deleteResult] = await db
      .promise()
      .query("DELETE FROM user_products WHERE expiration_date < ?", [today]);

    res.status(200).json({ success: true, message: "Verlopen producten verwijderd", removed: deleteResult.affectedRows });
  } catch (err) {
    console.error("Fout bij cleanup verlopen producten:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 🗑️ Verwijder handmatig een product
router.delete("/delete/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    await db.promise().query("DELETE FROM user_products WHERE id = ?", [productId]);
    res.status(200).json({ success: true, message: "Product verwijderd" });
  } catch (err) {
    console.error("Fout bij verwijderen product:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 🔍 Haal laatste verwijderde producten op
router.get("/deleted", async (req, res) => {
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