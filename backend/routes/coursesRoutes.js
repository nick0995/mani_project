// routes/coursesRoutes.js
import express from "express";
import { pool } from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";
import multer from "multer";
import path from "path";

const router = express.Router();

// --- Multer storage config ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // save uploads here
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// --- GET all courses (public) ---
router.get("/", async (_, res) => {
  try {
    const result = await pool.query("SELECT * FROM courses ORDER BY id ASC");
    res.json({ success: true, data: result.rows });
  } catch (err) {
    console.error("Fetch courses error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- CREATE course (SuperAdmin only, with image upload) ---
router.post("/", requireAuth, upload.single("img"), async (req, res) => {
  try {
    if (req.user.role !== "superadmin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const { title, category, description, duration } = req.body;
    const img = req.file ? req.file.filename : null;

    if (!title || !category || !description) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    const q = await pool.query(
      `INSERT INTO courses (title, category, description, duration, img)
       VALUES ($1,$2,$3,$4,$5)
       RETURNING *`,
      [title, category, description, duration || "1 Week", img]
    );

    return res.json({ success: true, message: "Course added", course: q.rows[0] });
  } catch (err) {
    console.error("Add course error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- UPDATE course (SuperAdmin only, with image upload) ---
router.put("/:id", requireAuth, upload.single("img"), async (req, res) => {
  try {
    if (req.user.role !== "SuperAdmin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const { title, category, description, duration } = req.body;
    const img = req.file ? req.file.filename : null;

    const q = await pool.query(
      `UPDATE courses
       SET title=$1, category=$2, description=$3, duration=$4, img=COALESCE($5, img)
       WHERE id=$6
       RETURNING *`,
      [title, category, description, duration, img, req.params.id]
    );

    if (q.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    return res.json({ success: true, message: "Course updated", course: q.rows[0] });
  } catch (err) {
    console.error("Update course error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- DELETE course (SuperAdmin only) ---
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    if (req.user.role !== "SuperAdmin") {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const q = await pool.query(
      `DELETE FROM courses WHERE id=$1 RETURNING id, title`,
      [req.params.id]
    );

    if (q.rowCount === 0) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    return res.json({ success: true, message: "Course deleted", course: q.rows[0] });
  } catch (err) {
    console.error("Delete course error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- POST enroll (protected) ---
router.post("/enroll", requireAuth, async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    if (!courseId) {
      return res.status(400).json({ success: false, message: "courseId required" });
    }

    await pool.query(
      "INSERT INTO enrollments (course_id, user_id) VALUES ($1, $2)",
      [courseId, userId]
    );

    res.json({ success: true, message: "Enrolled successfully" });
  } catch (err) {
    console.error("Enroll error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
