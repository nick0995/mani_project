const express = require('express');
const { Question, TestResult } = require('../models');
const { authMiddleware } = require('../middleware/auth');
const router = express.Router();

// Get questions for a specific category
router.get('/questions/:category', authMiddleware, async (req, res) => {
  try {
    const { category } = req.params;
    const questions = await Question.findAll({
      where: { category, isActive: true },
      attributes: { exclude: ['correctAnswer'] }
    });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit test
router.post('/submit', authMiddleware, async (req, res) => {
  try {
    const { category, answers, timeSpent } = req.body;
    const userId = req.session.userId;

    // Get all questions for the category
    const questions = await Question.findAll({
      where: { category, isActive: true }
    });

    // Calculate score
    let score = 0;
    const totalQuestions = questions.length;

    questions.forEach((question, index) => {
      if (answers[question.id] === question.correctAnswer) {
        score += question.points;
      }
    });

    const percentage = (score / totalQuestions) * 100;
    const isPassed = percentage >= 75;

    const testResult = await TestResult.create({
      userId,
      category,
      score,
      totalQuestions,
      percentage,
      timeSpent,
      answers,
      isPassed,
    });

    res.json({
      result: testResult,
      correctAnswers: questions.map(q => ({
        id: q.id,
        correctAnswer: q.correctAnswer
      }))
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user's test results
router.get('/results', authMiddleware, async (req, res) => {
  try {
    const userId = req.session.userId;
    const results = await TestResult.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']]
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;