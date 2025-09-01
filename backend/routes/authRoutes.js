// routes/auth.js
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

/**
 * Helper: build username = Rank.Name (no spaces)
 */
function makeUsername(rank, name) {
  return `${(rank || "").trim()}.${(name || "").trim()}`.replace(/\s+/g, "");
}

/**
 * POST /api/auth/register
 * Body: { name, rank, belt, mobile, email, district, policeStation }
 * Rules:
 *  - unique email OR mobile (reject duplicates)
 *  - username = Rank.Name
 *  - default password = Rank.Name@123 (hashed in DB)
 */
router.post("/register", async (req, res) => {
  try {
    const { name, rank, belt, mobile, email, district, policeStation } = req.body;

    if (!name || !rank || !mobile || !email || !district || !policeStation) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const username = makeUsername(rank, name);
    const defaultPassword = `${username}@123`;

    // check duplicates by email or mobile
    const dup = await pool.query(
      `SELECT id FROM users WHERE email = $1 OR mobile = $2 LIMIT 1`,
      [email, mobile]
    );
    if (dup.rowCount > 0) {
      return res.status(400).json({ message: "User already registered with this Email or Mobile" });
    }

    // hash password
    const hashed = await bcrypt.hash(defaultPassword, 10);

    const insert = await pool.query(
      `INSERT INTO users 
        (username, name, rank, belt, mobile, email, district, police_station, password, role)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING id, username, email, mobile, role`,
      [username, name, rank, belt || null, mobile, email, district, policeStation, hashed, "user"]
    );

    return res.json({
      message: "Registered successfully",
      username,
      password: defaultPassword, // return only once for initial login info
      user: insert.rows[0]
    });
  } catch (err) {
    console.error("Register error:", err);
    // handle unique constraint collisions gracefully
    if (String(err.message).includes("unique")) {
      return res.status(400).json({ message: "Email/Mobile/Username already exists" });
    }
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/auth/login
 * Body: { emailOrPhone, password }
 * Accepts email or mobile
 */
router.post("/login", async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    if (!emailOrPhone || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const q = await pool.query(
      `SELECT id, username, email, mobile, password, role 
         FROM users 
        WHERE email = $1 OR mobile = $1 
        LIMIT 1`,
      [emailOrPhone]
    );
    if (q.rowCount === 0) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = q.rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.json({
      message: "Login successful",
      token,
      user: { username: user.username, email: user.email, mobile: user.mobile, role: user.role }
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/auth/verify
 * Header: Authorization: Bearer <token>
 * Returns: { valid: true, role, userId }
 */
router.post("/verify", requireAuth, async (req, res) => {
  return res.json({ valid: true, role: req.user.role, userId: req.user.id });
});

/**
 * GET /api/auth/users
 * Fetch all users (admin only)
 */
router.get("/users", requireAuth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  try {
    const q = await pool.query(
      `SELECT id, username, name, rank, belt, mobile, email, district, police_station, role FROM users ORDER BY id DESC`
    );
    res.json(q.rows);
  } catch (err) {
    console.error("Fetch users error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * PUT /api/auth/users/:id
 * Update user info (admin only)
 * Body: { name, rank, belt, mobile, email, district, policeStation, role }
 */
router.put("/users/:id", requireAuth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  const { id } = req.params;
  const { name, rank, belt, mobile, email, district, policeStation, role } = req.body;
  try {
    const q = await pool.query(
      `UPDATE users SET
        name = $1, rank = $2, belt = $3, mobile = $4, email = $5, district = $6, police_station = $7, role = $8
        WHERE id = $9
        RETURNING id, username, name, rank, belt, mobile, email, district, police_station, role`,
      [name, rank, belt, mobile, email, district, policeStation, role, id]
    );
    if (q.rowCount === 0) return res.status(404).json({ message: "User not found" });
    res.json(q.rows[0]);
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/auth/users/:id
 * Remove user (admin only)
 */
router.delete("/users/:id", requireAuth, async (req, res) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Forbidden" });
  }
  const { id } = req.params;
  try {
    const q = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING id`, [id]);
    if (q.rowCount === 0) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted", id });
  } catch (err) {
    console.error("Delete user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
