import { pool } from "../config/db.js";
import bcrypt from "bcrypt";

export const addUser = async (req, res) => {
  try {
    console.log("📥 Incoming data:", req.body);  
    const { name, rank, belt, mobile, email, policeStation, district, username, password } = req.body;

    if (!name || !username || !password) {
      return res.status(400).json({ message: "Name, username, and password are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      `INSERT INTO users (name, rank, belt, mobile, email, police_station, district, username, password)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`,
      [name, rank, belt, mobile, email, policeStation, district, username, hashedPassword]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users ORDER BY created_at DESC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};