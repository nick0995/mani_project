import express from 'express';
import multer from 'multer';
import csv from 'csv-parser';
import fs from 'fs';
import { User, Question } from '../models/index.js';
import { adminMiddleware } from '../middleware/auth.js';
const router = express.Router();

// Configure multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Get all users
router.get('/users', adminMiddleware, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete user
router.delete('/users/:id', adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user
router.put('/users/:id', adminMiddleware, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    await user.update(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create question
router.post('/questions', adminMiddleware, async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload CSV questions
router.post('/questions/upload', adminMiddleware, upload.single('csvFile'), async (req, res) => {
  try {
    const questions = [];
    const filePath = req.file.path;

    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        questions.push({
          questionText: row.question,
          options: [row.option1, row.option2, row.option3, row.option4],
          correctAnswer: parseInt(row.correctAnswer) - 1,
          category: row.category.toLowerCase(),
          difficulty: row.difficulty || 'medium',
          points: parseInt(row.points) || 1,
        });
      })
      .on('end', async () => {
        try {
          await Question.bulkCreate(questions);
          fs.unlinkSync(filePath); // Clean up uploaded file
          res.json({ message: `${questions.length} questions uploaded successfully` });
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all questions
router.get('/questions', adminMiddleware, async (req, res) => {
  try {
    const questions = await Question.findAll();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete question
router.delete('/questions/:id', adminMiddleware, async (req, res) => {
  try {
    const question = await Question.findByPk(req.params.id);
    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    await question.destroy();
    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;