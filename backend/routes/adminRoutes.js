import express from "express";
import { requireAdmin, requireSuperAdmin } from "../middleware/auth.js";
import bcrypt from "bcryptjs";

const router = express.Router();

// Example admin-only route
router.get("/stats", requireAdmin, async (req, res) => {
  res.json({
    message: "Only admins can see this",
    serverTime: new Date(),
  });
});

// Example: list all users
router.get("/users", requireAdmin, async (req, res) => {
  // query all users
  const { rows } = await req.db.query("SELECT id, username, email, role FROM users");
  res.json(rows);
});

// Superadmin: Register new user
router.post("/register", requireSuperAdmin, async (req, res) => {
  try {
    const {
      name,
      rank,
      belt,
      mobile,
      email,
      policeStation,
      district,
      username,
      password,
      role = "User"
    } = req.body;

    // Validate required fields
    if (!name || !rank || !mobile || !email || !policeStation || !district || !username || !password) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    // Check if user already exists
    const existingUser = await req.db.query(
      "SELECT id FROM users WHERE email = $1 OR username = $2",
      [email, username]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: "User with this email or username already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const { rows } = await req.db.query(
      `INSERT INTO users (name, rank, belt, mobile, email, police_station, district, username, password, role) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
       RETURNING id, name, rank, belt, mobile, email, police_station, district, username, role`,
      [name, rank, belt, mobile, email, policeStation, district, username, hashedPassword, role]
    );

    res.status(201).json({
      message: "User created successfully",
      user: rows[0]
    });
  } catch (error) {
    console.error("User registration error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Superadmin: Get all users with full details
router.get("/users", requireSuperAdmin, async (req, res) => {
  try {
    const { rows } = await req.db.query(
      "SELECT id, name, rank, belt, mobile, email, police_station, district, username, role FROM users ORDER BY id"
    );
    res.json(rows);
  } catch (error) {
    console.error("Fetch users error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Superadmin: Update user
router.put("/users/:id", requireSuperAdmin, async (req, res) => {
  try {
    const userId = req.params.id;
    const {
      name,
      rank,
      belt,
      mobile,
      email,
      policeStation,
      district,
      username,
      password,
      role
    } = req.body;

    // Check if user exists
    const userCheck = await req.db.query("SELECT id FROM users WHERE id = $1", [userId]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if email or username is already taken by another user
    if (email || username) {
      const existingUser = await req.db.query(
        "SELECT id FROM users WHERE (email = $1 OR username = $2) AND id != $3",
        [email, username, userId]
      );

      if (existingUser.rows.length > 0) {
        return res.status(400).json({ message: "Email or username already exists" });
      }
    }

    // Build update query dynamically
    const updateFields = [];
    const updateValues = [];
    let paramCount = 1;

    if (name) {
      updateFields.push(`name = $${paramCount}`);
      updateValues.push(name);
      paramCount++;
    }
    if (rank) {
      updateFields.push(`rank = $${paramCount}`);
      updateValues.push(rank);
      paramCount++;
    }
    if (belt !== undefined) {
      updateFields.push(`belt = $${paramCount}`);
      updateValues.push(belt);
      paramCount++;
    }
    if (mobile) {
      updateFields.push(`mobile = $${paramCount}`);
      updateValues.push(mobile);
      paramCount++;
    }
    if (email) {
      updateFields.push(`email = $${paramCount}`);
      updateValues.push(email);
      paramCount++;
    }
    if (policeStation) {
      updateFields.push(`police_station = $${paramCount}`);
      updateValues.push(policeStation);
      paramCount++;
    }
    if (district) {
      updateFields.push(`district = $${paramCount}`);
      updateValues.push(district);
      paramCount++;
    }
    if (username) {
      updateFields.push(`username = $${paramCount}`);
      updateValues.push(username);
      paramCount++;
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateFields.push(`password = $${paramCount}`);
      updateValues.push(hashedPassword);
      paramCount++;
    }
    if (role) {
      updateFields.push(`role = $${paramCount}`);
      updateValues.push(role);
      paramCount++;
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ message: "No fields to update" });
    }

    updateValues.push(userId); // Add userId as the last parameter

    const query = `UPDATE users SET ${updateFields.join(", ")} WHERE id = $${paramCount} RETURNING id, name, rank, belt, mobile, email, police_station, district, username, role`;
    
    const { rows } = await req.db.query(query, updateValues);

    res.json({
      message: "User updated successfully",
      user: rows[0]
    });
  } catch (error) {
    console.error("User update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Superadmin: Delete user
router.delete("/users/:id", requireSuperAdmin, async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const userCheck = await req.db.query("SELECT id, name FROM users WHERE id = $1", [userId]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete user
    await req.db.query("DELETE FROM users WHERE id = $1", [userId]);

    res.json({
      message: `User ${userCheck.rows[0].name} deleted successfully`
    });
  } catch (error) {
    console.error("User deletion error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Example: only superadmin can see this
router.get("/super-stats", requireSuperAdmin, async (req, res) => {
  res.json({
    message: "Only superadmins can see this",
    serverTime: new Date(),
  });
});

// Superadmin: list all users with full details
router.get("/all-users", requireSuperAdmin, async (req, res) => {
  const { rows } = await req.db.query("SELECT * FROM users ORDER BY id");
  res.json(rows);
});

// Superadmin: promote/demote user role
router.put("/users/:id/role", requireSuperAdmin, async (req, res) => {
  const { role } = req.body;
  if (!["user", "admin", "superadmin"].includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }
  await req.db.query("UPDATE users SET role = $1 WHERE id = $2", [role, req.params.id]);
  res.json({ message: `Role updated to ${role}` });
});

export default router;
