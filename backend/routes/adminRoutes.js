import express from "express";
import { requireAdmin, requireSuperAdmin } from "../middleware/auth.js";


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

export default router;
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
