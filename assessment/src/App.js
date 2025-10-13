import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import axios from "axios";

import LoginPage from './components/LoginPage';
import Instructions from './components/Instructions';
import TestPage from './components/TestPage';
import Scoreboard from './components/Scoreboard';
import { generateCertificate } from './components/generateCertificate';

const initialQuestions = [
  { question: "Which of the following is the smallest unit of memory?", options: ["Kilobyte","Megabyte","Gigabyte","Terabyte"], correctAnswer: 0, userAnswer: null, marked: false },
  { question: "What does HTML stand for?", options: ["Hyper Text Markup Language","High Text Markup Language","Hyper Tabular Markup Language","Hyperlink and Text Markup Language"], correctAnswer: 0, userAnswer: null, marked: false },
  { question: "Which of the following is not a programming language?", options: ["Java","HTML","CSS","Windows"], correctAnswer: 3, userAnswer: null, marked: false },
  { question: "What is the full form of CPU?", options: ["Central Processing Unit","Central Process Unit","Computer Processing Unit","Computer Process Unit"], correctAnswer: 0, userAnswer: null, marked: false },
  { question: "Which programming language is known as the 'mother of all languages'?", options: ["C","Fortran","Assembly","COBOL"], correctAnswer: 3, userAnswer: null, marked: false }
];

function App() {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [authToken, setAuthToken] = useState(null);

  const [testStarted, setTestStarted] = useState(false);
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20 * 60);

  // Restore state from localStorage
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('username');
    const savedRole = localStorage.getItem('role');
    const savedTest = localStorage.getItem('testStarted') === 'true';
    const savedQuestions = localStorage.getItem('questions');
    const savedIndex = parseInt(localStorage.getItem('currentQuestionIndex') || '0');
    const savedTime = parseInt(localStorage.getItem('timeLeft') || '0');

    if (token && savedUser) {
      setAuthToken(token);
      setIsLoggedIn(true);
      setUsername(savedUser);
      setRole(savedRole || '');
    }

    if (savedTest) {
      setTestStarted(true);
      if (savedQuestions) setQuestions(JSON.parse(savedQuestions));
      setCurrentQuestionIndex(savedIndex);
      setTimeLeft(savedTime);
    }
  }, []);

  // Persist test state
  useEffect(() => {
    localStorage.setItem('testStarted', testStarted);
    localStorage.setItem('questions', JSON.stringify(questions));
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
    localStorage.setItem('timeLeft', timeLeft);
  }, [testStarted, questions, currentQuestionIndex, timeLeft]);

  // Login / Logout
  const handleLoginSuccess = (user, userRole, token) => {
    setIsLoggedIn(true);
    setUsername(user);
    setRole(userRole);
    setAuthToken(token);

    localStorage.setItem('username', user);
    localStorage.setItem('role', userRole);
    localStorage.setItem('authToken', token);

    navigate('/instructions');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setRole('');
    setAuthToken(null);
    setTestStarted(false);
    localStorage.clear();
    navigate('/');
  };

  // Load CSV questions (optional)
  // useEffect(() => {
  //   Papa.parse('/question.csv', {
  //     download: true,
  //     header: true,
  //     complete: (results) => {
  //       const formatted = results.data.filter(q => q.question).map(q => ({
  //         question: q.question,
  //         options: [q.option_a, q.option_b, q.option_c, q.option_d],
  //         correctAnswer: q.correctAnswer ? parseInt(q.correctAnswer) : 0,
  //         userAnswer: null,
  //         marked: false
  //       }));
  //       if (formatted.length > 0) setQuestions(formatted);
  //     },
  //     error: (err) => console.error("CSV Load Error", err)
  //   });
  // }, []);
  useEffect(() => {
  const fetchQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/questions"); // <-- your backend API endpoint
      const data = response.data;

      // Format the data to match your frontend structure
      const formatted = data.map(q => ({
        question: q.question_text || q.question, // adjust based on your DB column name
        options: [q.option_a, q.option_b, q.option_c, q.option_d],
        correctAnswer: q.correct_option_index, // or q.correct_option, adjust accordingly
        userAnswer: null,
        marked: false
      }));

      setQuestions(formatted);
    } catch (error) {
      console.error("Error loading questions from DB:", error);
    }
  };

  fetchQuestions();
}, []);


  // Test timer
  useEffect(() => {
    if (!testStarted) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          endTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testStarted]);

const startTest = async () => {
  setTestStarted(true);
  setCurrentQuestionIndex(0);
  setTimeLeft(20 * 60);

  // Wait for state to flush
  setTimeout(() => {
    navigate("/TestPage");
  }, 0);
};



  const endTest = () => {
    setTestStarted(false);
    let score = 0;
    questions.forEach(q => {
      if (q.userAnswer === q.correctAnswer) score++;
    });
    const percentage = (score / questions.length) * 100;

    alert(`Test Submitted. Score: ${score}/${questions.length} (${percentage.toFixed(2)}%)`);

    if (percentage >= 60) {
      generateCertificate(username, score, percentage);
    }

    setQuestions(initialQuestions);
    setCurrentQuestionIndex(0);
    setTimeLeft(20 * 60);
    localStorage.removeItem('testStarted');
    localStorage.removeItem('questions');
    localStorage.removeItem('currentQuestionIndex');
    localStorage.removeItem('timeLeft');
  };

  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<LoginPage onLogin={handleLoginSuccess} />} />

      {/* Instructions */}
      <Route
  path="/instructions"
  element={<Instructions onStartTest={startTest} />}
/>

      {/* Test Page */}
      <Route path="/TestPage" element={
        testStarted && isLoggedIn ? (
          <TestPage
            username={username}
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            timeLeft={timeLeft}
            endTest={endTest}
            saveAndNext={(selectedOptionIndex) => {
              const newQ = [...questions];
              newQ[currentQuestionIndex].userAnswer = selectedOptionIndex;
              setQuestions(newQ);
              setCurrentQuestionIndex(i => i < questions.length - 1 ? i + 1 : i);
            }}
            previousQuestion={() => setCurrentQuestionIndex(i => i > 0 ? i - 1 : 0)}
            clearResponse={() => {
              const newQ = [...questions];
              newQ[currentQuestionIndex].userAnswer = null;
              setQuestions(newQ);
            }}
            markForReview={() => {
              const newQ = [...questions];
              newQ[currentQuestionIndex].marked = !newQ[currentQuestionIndex].marked;
              setQuestions(newQ);
            }}
            saveCurrentAnswer={(selectedOptionIndex) => {
              const newQ = [...questions];
              newQ[currentQuestionIndex].userAnswer = selectedOptionIndex;
              setQuestions(newQ);
            }}
          />
        ) : <Navigate to={isLoggedIn ? "/instructions" : "/"} />
      } />

      {/* Scoreboard */}
      <Route path="/scoreboard" element={
        isLoggedIn ? <Scoreboard /> : <Navigate to="/" />
      } />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
