// routes/assessmentsRoutes.js
import express from "express";
import { pool } from "../config/db.js";
import { requireAuth } from "../middleware/auth.js";
import multer from "multer";
import fs from "fs";
import { getAssessmentQuestions, checkPreviousAttempt } from "../controllers/assessmentController.js";
import csv from "csv-parser";


const upload = multer({ dest: "uploads/" }); // Temporary storage
const router = express.Router();
router.get("/:courseId/:assessmentId/questions", requireAuth, getAssessmentQuestions);
router.get("/assessment/:courseId/:assessmentId/check", checkPreviousAttempt);


// --- GET all assessments ---
router.get("/", requireAuth, async (req, res) => {
  try {
    const { course_id } = req.query;
    
    let query = "SELECT * FROM assessments";
    let params = [];
    
    if (course_id) {
      query += " WHERE course_id = $1";
      params = [course_id];
    }
    
    query += " ORDER BY created_at DESC";
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error("Fetch assessments error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- GET single assessment ---
router.get("/:id", requireAuth, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM assessments WHERE id = $1",
      [req.params.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Assessment not found" });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Fetch assessment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- CREATE assessment (SuperAdmin/Admin only) ---
router.post("/", requireAuth, async (req, res) => {
  try {
    if (!["SuperAdmin", "superadmin", "Admin", "admin"].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const { title, description, duration, total_questions, course_id } = req.body;

    if (!title || !course_id) {
      return res.status(400).json({ 
        success: false, 
        message: "Title and course_id are required" 
      });
    }

    const result = await pool.query(
      `INSERT INTO assessments (title, description, duration, total_questions, course_id, created_by)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [
        title, 
        description || null, 
        duration || 30, 
        total_questions || 10, 
        course_id, 
        req.user.id
      ]
    );

    res.json({ 
      success: true, 
      message: "Assessment created successfully", 
      assessment: result.rows[0] 
    });
  } catch (err) {
    console.error("Create assessment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- UPDATE assessment (SuperAdmin/Admin only) ---
router.put("/:id", requireAuth, async (req, res) => {
  try {
    if (!["SuperAdmin", "superadmin", "Admin", "admin"].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const { title, description, duration, total_questions, course_id } = req.body;

    const result = await pool.query(
      `UPDATE assessments 
       SET title = $1, description = $2, duration = $3, total_questions = $4, course_id = $5, updated_at = NOW()
       WHERE id = $6
       RETURNING *`,
      [title, description, duration, total_questions, course_id, req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Assessment not found" });
    }

    res.json({ 
      success: true, 
      message: "Assessment updated successfully", 
      assessment: result.rows[0] 
    });
  } catch (err) {
    console.error("Update assessment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- DELETE assessment (SuperAdmin/Admin only) ---
router.delete("/:id", requireAuth, async (req, res) => {
  try {
    if (!["SuperAdmin", "superadmin", "Admin", "admin"].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const result = await pool.query(
      "DELETE FROM assessments WHERE id = $1 RETURNING id, title",
      [req.params.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Assessment not found" });
    }

    res.json({ 
      success: true, 
      message: "Assessment deleted successfully", 
      assessment: result.rows[0] 
    });
  } catch (err) {
    console.error("Delete assessment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- ASSIGN assessment to user ---
router.post("/assign", requireAuth, async (req, res) => {
  try {
    if (!["SuperAdmin", "superadmin", "Admin", "admin"].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const { user_id, assessment_id } = req.body;

    if (!user_id || !assessment_id) {
      return res.status(400).json({ 
        success: false, 
        message: "user_id and assessment_id are required" 
      });
    }

    // Check if already assigned
    const existing = await pool.query(
      "SELECT id FROM assigned_assessments WHERE user_id = $1 AND assessment_id = $2",
      [user_id, assessment_id]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: "Assessment already assigned to this user" 
      });
    }

    const result = await pool.query(
      `INSERT INTO assigned_assessments (user_id, assessment_id, assigned_by)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [user_id, assessment_id, req.user.id]
    );

    res.json({ 
      success: true, 
      message: "Assessment assigned successfully", 
      assignment: result.rows[0] 
    });
  } catch (err) {
    console.error("Assign assessment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- GET assigned assessments ---
router.get("/assigned/:userId", requireAuth, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT aa.*, a.title as assessment_title, a.duration, c.title as course_title
      FROM assigned_assessments aa
      JOIN assessments a ON aa.assessment_id = a.id
      LEFT JOIN courses c ON a.course_id = c.id
      WHERE aa.user_id = $1
      ORDER BY aa.assigned_at DESC
    `, [req.params.userId]);

    res.json(result.rows);
  } catch (err) {
    console.error("Get assigned assessments error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// --- REMOVE assignment ---
router.delete("/assigned/:assignmentId", requireAuth, async (req, res) => {
  try {
    if (!["SuperAdmin", "superadmin", "Admin", "admin"].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    const result = await pool.query(
      "DELETE FROM assigned_assessments WHERE id = $1 RETURNING id",
      [req.params.assignmentId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Assignment not found" });
    }

    res.json({ success: true, message: "Assignment removed successfully" });
  } catch (err) {
    console.error("Remove assignment error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
router.post("/:courseId/:assessmentId/questions/upload-csv", upload.single("file"), async (req, res) => {
  try {
    const { courseId, assessmentId } = req.params;
    if (!req.file) return res.status(400).json({ success: false, message: "CSV file is required" });

    // ✅ Check if assessment belongs to the course
    const [assessment] = await pool.query(
      `SELECT * FROM assessments WHERE id = ? AND course_id = ?`,
      [assessmentId, courseId]
    );

    if (assessment.length === 0) {
      return res.status(400).json({ success: false, message: "Assessment does not belong to selected course" });
    }

    const filePath = path.join(req.file.path);
    const questions = [];

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        questions.push([
          assessmentId,
          row.question,
          row.option_a,
          row.option_b,
          row.option_c,
          row.option_d,
          row.correct_option
        ]);
      })
      .on("end", async () => {
        if (questions.length > 0) {
          await pool.query(
            `INSERT INTO questions (assessment_id, question_text, option_a, option_b, option_c, option_d, correct_option) VALUES ?`,
            [questions]
          );
        }

        fs.unlinkSync(filePath);
        res.json({ success: true, message: "✅ CSV uploaded successfully", total: questions.length });
      });

  } catch (err) {
    console.error("❌ CSV upload error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});








export default router;