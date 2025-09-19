// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { pool } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import coursesRoutes from "./routes/coursesRoutes.js";

import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve images from /public
app.use("/public", express.static(path.join(__dirname, "public")));
// --- Serve static images ---
app.use("/images", express.static("public/images"));
// Simple healthcheck
app.get("/api/health", async (_, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ ok: true });
  } catch {
    res.status(500).json({ ok: false });
  }
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/courses", coursesRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
