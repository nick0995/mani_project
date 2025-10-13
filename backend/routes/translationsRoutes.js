import express from "express";
import { pool } from "../config/db.js";

const router = express.Router();

// ✅ Get translation by language
router.get("/:lang", async (req, res) => {
  try {
    const { lang } = req.params;
    const result = await pool.query(
      "SELECT * FROM translations WHERE lang = $1 LIMIT 1",
      [lang]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Translation not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Fetch translation error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
