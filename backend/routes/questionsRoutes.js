import express from "express";
import { pool } from "../config/db.js";

const router = express.Router();

// GET all questions
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM questions");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch questions" });
  }
});

export default router;
