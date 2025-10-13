// controllers/assessmentController.js
import { pool } from "../config/db.js";

export const getAssessmentQuestions = async (req, res) => {
  try {
    const { courseId, assessmentId } = req.params;

    // ✅ Basic validation
    if (!courseId || !assessmentId) {
      return res.status(400).json({
        success: false,
        message: "Missing courseId or assessmentId in request params",
      });
    }

    // ✅ Fetch questions from database
    const result = await pool.query(
      `SELECT 
         id AS question_id,
         question_text,
         option_a,
         option_b,
         option_c,
         option_d,
         correct_option
       FROM questions
       WHERE course_id = $1 AND assessment_id = $2
       ORDER BY id ASC`,
      [courseId, assessmentId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No questions found for this course and assessment",
      });
    }

    res.json({
      success: true,
      total: result.rows.length,
      questions: result.rows,
    });
  

    // ✅ Fetch course & assessment info
    const assessmentResult = await pool.query(
      `SELECT a.id AS assessment_id, a.title AS assessment_title, 
              c.id AS course_id, c.name AS course_name
       FROM assessments a
       JOIN courses c ON a.course_id = c.id
       WHERE a.id = $1 AND c.id = $1`,
      [assessmentId, courseId]
    );

    if (assessmentResult.rows.length === 0) {
      return res.status(404).json({ success: false, message: "Assessment not found for this course" });
    }

    // ✅ Fetch questions
    const questionsResult = await pool.query(
      `SELECT id, question_text, option_a, option_b, option_c, option_d, correct_option
       FROM questions 
       WHERE assessment_id = $1`,
      [assessmentId]
    );

    res.json({
      success: true,
      questions: questionsResult.rows,
      course: assessmentResult.rows[0].course_name,
      assessment: assessmentResult.rows[0].assessment_title,
      totalQuestions: questionsResult.rows.length,
      totalMarks: questionsResult.rows.length, // assuming 1 mark per question
    });
  } catch (err) {
    console.error("❌ Error fetching questions:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Submit assessment results
export const submitAssessment = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { assessmentId, answers } = req.body;

    if (!userId || !assessmentId) {
      return res.status(400).json({ success: false, message: "Missing userId or assessmentId" });
    }

    // ✅ Fetch all correct answers
    const questionsResult = await pool.query(
      "SELECT id, correct_option FROM questions WHERE assessment_id = $1",
      [assessmentId]
    );

    const questions = questionsResult.rows;
    let score = 0;
    const totalQuestions = questions.length;

    questions.forEach(q => {
      const userAnswer = answers.find(a => a.question_id === q.id);
      if (userAnswer && userAnswer.selected_option === q.correct_option) {
        score++;
      }
    });

    // ✅ Save attempt (make sure this table exists)
    await pool.query(
      `INSERT INTO attempts (user_id, assessment_id, score, total_questions)
       VALUES ($1, $2, $3, $4)`,
      [userId, assessmentId, score, totalQuestions]
    );

    res.json({
      success: true,
      message: "Assessment submitted successfully",
      score,
      totalQuestions,
    });
  } catch (err) {
    console.error("❌ Error submitting assessment:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Check if user already attempted an assessment
export const checkPreviousAttempt = async (req, res) => {
  try {
    const { courseId, assessmentId } = req.params;
    const userId = req.user?.id;

    console.log("🔍 userId:", userId);
    console.log("🔍 courseId:", courseId);
    console.log("🔍 assessmentId:", assessmentId);

    // 🔒 Validate inputs before querying
    if (!userId || !courseId || !assessmentId) {
      return res.status(400).json({ success: false, message: "Missing userId, courseId, or assessmentId" });
    }

    // ✅ Use the same table you insert into (`attempts`)
    const attemptResult = await pool.query(
      `SELECT * FROM attempts
       WHERE user_id = $1 AND assessment_id = $1
       LIMIT 1`,
      [userId, assessmentId]
    );

    if (attemptResult.rows.length > 0) {
      return res.json({ attempted: true, attempt: attemptResult.rows[0] });
    }

    res.json({ attempted: false });
  } catch (err) {
    console.error("❌ Attempt check error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
