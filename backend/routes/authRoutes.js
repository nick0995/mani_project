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
 * Body: { name, rank, belt, mobile, email, district, policeStation, password, role? }
 */
router.post("/register", async (req, res) => {
  try {
    const {
      name,
      rank,
      belt,
      mobile,
      email,
      district,
      policeStation,
      password,
      role,
    } = req.body;

    if (!name || !rank || !mobile || !email || !district || !policeStation || !password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const username = makeUsername(rank, name);

    // check duplicates by email or mobile
    const dup = await pool.query(
      `SELECT id FROM users WHERE email = $1 OR mobile = $2 LIMIT 1`,
      [email, mobile]
    );
    if (dup.rowCount > 0) {
      return res
        .status(400)
        .json({ message: "User already registered with this Email or Mobile" });
    }

    // hash password
    const hashed = await bcrypt.hash(password, 10);

    // default role = user
    const userRole = role || "user";

    const insert = await pool.query(
      `INSERT INTO users 
        (username, name, rank, belt, mobile, email, district, police_station, password, role)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
       RETURNING id, username, email, mobile, role, rank, name, belt, district, police_station`,
      [username, name, rank, belt || null, mobile, email, district, policeStation, hashed, userRole]
    );

    return res.json({
      message: "User registered successfully",
      user: insert.rows[0],
    });
  } catch (err) {
    console.error("Register error:", err);
    if (String(err.message).includes("unique")) {
      return res.status(400).json({ message: "Email/Mobile/Username already exists" });
    }
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/auth/login
 * Body: { emailOrPhone, password }
 */
router.post("/login", async (req, res) => {
  try {
    const { emailOrPhone, password } = req.body;
    if (!emailOrPhone || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }

    const q = await pool.query(
      `SELECT id, username, name, rank, belt, email, mobile, district, police_station, password, role 
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
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        rank: user.rank,
        belt: user.belt,
        email: user.email,
        mobile: user.mobile,
        district: user.district,
        policeStation: user.police_station,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/auth/forgot-password/verify
 * Body: { emailOrPhone }
 */
router.post("/forgot-password/verify", async (req, res) => {
  try {
    const { emailOrPhone } = req.body;

    if (!emailOrPhone) {
      return res.status(400).json({ message: "Email or Mobile is required" });
    }

    const q = await pool.query(
      `SELECT id, email, mobile FROM users WHERE email = $1 OR mobile = $1 LIMIT 1`,
      [emailOrPhone]
    );

    if (q.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      message: "User verified. Proceed to reset password.",
      userId: q.rows[0].id,
    });
  } catch (err) {
    console.error("Forgot-password verify error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});
/**
 * POST /api/auth/forgot-password/reset
 * Body: { emailOrPhone, newPassword }
 */
router.post("/forgot-password/reset", async (req, res) => {
  try {
    const { emailOrPhone, newPassword } = req.body;

    if (!emailOrPhone || !newPassword) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const q = await pool.query(
      `SELECT id FROM users WHERE email = $1 OR mobile = $1 LIMIT 1`,
      [emailOrPhone]
    );

    if (q.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashed = await bcrypt.hash(newPassword, 10);

    await pool.query(`UPDATE users SET password = $1 WHERE id = $2`, [
      hashed,
      q.rows[0].id,
    ]);

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("Forgot-password reset error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});




/**
 * POST /api/auth/verify
 * Header: Authorization: Bearer <token>
 */
router.post("/verify", requireAuth, async (req, res) => {
  return res.json({ valid: true, role: req.user.role, userId: req.user.id });
});

/**
 * GET /api/auth/me
 * Get logged-in user details
 */
router.get("/me", requireAuth, async (req, res) => {
  try {
    const q = await pool.query(
      `SELECT id, username, name, rank, belt, email, mobile, district, police_station, role
       FROM users WHERE id = $1`,
      [req.user.id]
    );

    if (q.rowCount === 0) return res.status(404).json({ message: "User not found" });

    return res.json(q.rows[0]);
  } catch (err) {
    console.error("Fetch me error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/auth/users
 * Fetch all users (for dashboard)
 */
router.get("/users", requireAuth, async (req, res) => {
  try {
    const q = await pool.query(
      `SELECT id, username, name, rank, belt, email, mobile, district, police_station, role, created_at
       FROM users
       ORDER BY created_at DESC`
    );
    return res.json(q.rows);
  } catch (err) {
    console.error("Fetch users error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});
/* * PUT /api/auth/users/:id
 * Update user details (SuperAdmin only)
 */
router.put("/users/:id", requireAuth, async (req, res) => {
  try {
    // Check if user is SuperAdmin
    if (req.user.role !== "admin" && req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const {
      name,
      rank,
      belt,
      mobile,
      email,
      district,
      policeStation,
      username,
      password,
      role,
    } = req.body;

    let hashedPassword = null;
    if (password && password.trim() !== "") {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    const q = await pool.query(
      `UPDATE users 
       SET name=$1, rank=$2, belt=$3, mobile=$4, email=$5, district=$6, police_station=$7, username=$8, role=$9, password=COALESCE($10, password)
       WHERE id=$11
       RETURNING id, username, name, rank, belt, email, mobile, district, police_station, role`,
      [
        name,
        rank,
        belt,
        mobile,
        email,
        district,
        policeStation,
        username,
        role || "User",
        hashedPassword,
        req.params.id,
      ]
    );

    if (q.rowCount === 0) return res.status(404).json({ message: "User not found" });

    return res.json({ message: "User updated", user: q.rows[0] });
  } catch (err) {
    console.error("Update user error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/auth/users/:id
 * Remove user (SuperAdmin only)
 */
router.delete("/users/:id", requireAuth, async (req, res) => {
  try {
    // Check if user is SuperAdmin
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const q = await pool.query(`DELETE FROM users WHERE id = $1 RETURNING id, name, email`, [
      req.params.id,
    ]);

    if (q.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({ message: "User deleted", user: q.rows[0] });
  } catch (err) {
    console.error("Delete user error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

export default router;
