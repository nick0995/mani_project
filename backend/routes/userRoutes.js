// routes/userRoutes.js
import express from "express";
import { pool } from "../config/db.js";

const router = express.Router();

// Fetch user by username or id
router.get("/:username", async (req, res) => {
  try {
    const { username } = req.params;
    const result = await pool.query(
      "SELECT name, rank, username, email, belt_no, police_station, district FROM users WHERE username = $1",
      [username]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
