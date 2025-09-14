import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom'; 
import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import AdminDashboard from  './components/admindashboard/AdminDashboard';
import Navbar from './components/userdashboard/Navbar';
import HeroSection from './components/userdashboard/HeroSection';
import FeaturesSection from './components/userdashboard/FeaturesSection';
import CoursesSection from './components/userdashboard/CoursesSection';
import LearningPathSection from './components/userdashboard/LearningPathSection';
import TestimonialsSection from './components/userdashboard/TestimonialsSection';
import CallToAction from './components/userdashboard/CallToAction';
import Footer from './components/userdashboard/Footer';
import Instructions from './components/userdashboard/Instructions';
import ICJSTraining from './components/userdashboard/ICJSTraining';
import CCTNSTraining from './components/userdashboard/CCTNSTraining';
import TestPage from './components/userdashboard/TestPage';
import AboutPage from './components/userdashboard/AboutPage';
import { generateCertificate } from './components/userdashboard/generateCertificate';
import ScrollToTop from './components/userdashboard/ScrollToTop';
import Mylearning from './components/userdashboard/mylearning';
import LatestPage from './components/userdashboard/LatestPage';
import SocialSidebar from './components/userdashboard/socialsidebar';
import LoginPage from './components/userdashboard/LoginPage';
import SuperAdminDashboard from './components/superadmindashboard/SuperAdminDashboard';
import ProtectedRoute from './components/userdashboard/ProtectedRoute';

const initialQuestions = [
  { question: "Which of the following is the smallest unit of memory?", options: ["Kilobyte", "Megabyte", "Gigabyte", "Terabyte"], correctAnswer: 0, userAnswer: null, marked: false },
  { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tabular Markup Language", "Hyperlink and Text Markup Language"], correctAnswer: 0, userAnswer: null, marked: false },
  { question: "Which of the following is not a programming language?", options: ["Java", "HTML", "CSS", "Windows"], correctAnswer: 3, userAnswer: null, marked: false },
  { question: "What is the full form of CPU?", options: ["Central Processing Unit", "Central Process Unit", "Computer Processing Unit", "Computer Process Unit"], correctAnswer: 0, userAnswer: null, marked: false },
  { question: "Which programming language is known as the 'mother of all languages'?", options: ["C", "Fortran", "Assembly", "COBOL"], correctAnswer: 3, userAnswer: null, marked: false }
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20 * 60);

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ restore login & test state from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    const savedRole = localStorage.getItem("role");
    const savedTest = localStorage.getItem("testStarted");
    const savedQuestions = localStorage.getItem("questions");
    const savedIndex = localStorage.getItem("currentQuestionIndex");
    const savedTime = localStorage.getItem("timeLeft");

    if (savedUser) {
      setIsLoggedIn(true);
      setUsername(savedUser);
      setRole(savedRole || "");
    }

    if (savedTest === "true") {
      setTestStarted(true);
      if (savedQuestions) setQuestions(JSON.parse(savedQuestions));
      if (savedIndex) setCurrentQuestionIndex(parseInt(savedIndex));
      if (savedTime) setTimeLeft(parseInt(savedTime));
    }

    setLoadingAuth(false);
  }, []);

  // ✅ persist test state
  useEffect(() => {
    localStorage.setItem("testStarted", testStarted);
    localStorage.setItem("questions", JSON.stringify(questions));
    localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
    localStorage.setItem("timeLeft", timeLeft);
  }, [testStarted, questions, currentQuestionIndex, timeLeft]);

  // ✅ login success saves to localStorage
  const handleLoginSuccess = (user, userRole) => {
    setIsLoggedIn(true);
    setUsername(user);
    setRole(userRole);
    localStorage.setItem("username", user);
    localStorage.setItem("role", userRole);
  };

  // ✅ logout clears localStorage
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUsername('');
    setRole(null);
    localStorage.clear();
    navigate("/login");
  };

  const hideHeaderFooter = ['/TestPage', '/instruction' , '/mylearning', '/login', '/adminDashboard', '/superAdminDashboard'].includes(location.pathname);
  const getNavLinkClass = (path) => (location.pathname === path ? 'active' : '');

  // ✅ load CSV questions
  useEffect(() => {
    Papa.parse('/question.csv', {
      download: true,
      header: true,
      complete: (results) => {
        const formatted = results.data.filter(q => q.question).map(q => ({
          question: q.question,
          options: [q.option_a, q.option_b, q.option_c, q.option_d],
          correctAnswer: q.correctAnswer ? parseInt(q.correctAnswer) : 0,
          userAnswer: null,
          marked: false
        }));
        setQuestions(formatted);
      },
      error: (err) => console.error("CSV Load Error", err)
    });
  }, []);

  // ✅ test timer
  useEffect(() => {
    let timerInterval;
    if (testStarted) {
      timerInterval = setInterval(() => {
        setTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(timerInterval);
            endTest();
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerInterval);
  }, [testStarted]);

   // ✅ refresh handling only for TestPage
  useEffect(() => {
    if (testStarted && location.pathname === "/TestPage") {
      const handleBeforeUnload = (e) => {
        e.preventDefault();
        e.returnValue = "If you refresh, your test will be auto submitted.";
      };
      window.addEventListener("beforeunload", handleBeforeUnload);

      const wasReloaded = performance.getEntriesByType("navigation")
        .some((nav) => nav.type === "reload");

      if (wasReloaded && sessionStorage.getItem("testVisited") === "true") {
        endTest();
        navigate("/", { replace: true });
      }

      sessionStorage.setItem("testVisited", "true");

      return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    } else {
      sessionStorage.removeItem("testVisited");
    }
  }, [testStarted, location.pathname]);

  const startTest = () => {
    setTestStarted(true);
    setCurrentQuestionIndex(0);
    setTimeLeft(20 * 60);
    navigate("/TestPage");
  };

  const endTest = () => {
    setTestStarted(false);
    let score = 0;
    questions.forEach(q => {
      if (q.userAnswer === q.correctAnswer) score++;
    });
    const percentage = (score / questions.length) * 100;
    alert(`Test Submitted. Your Score: ${score}/${questions.length} (${percentage.toFixed(2)}%)`);
    if (percentage >= 60) {
      generateCertificate(username, score, percentage);
    }
    setQuestions(initialQuestions);
    setCurrentQuestionIndex(0);
    localStorage.removeItem("testStarted");
    localStorage.removeItem("questions");
    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("timeLeft");
  };

  if (loadingAuth) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <ScrollToTop />

      {isLoggedIn && !hideHeaderFooter && (
        <Navbar
          isLoggedIn={isLoggedIn}
          username={username}
          onLogout={handleLogout}
          getNavLinkClass={getNavLinkClass}
        />
      )}

      <Routes>
        <Route path="/login" element={<LoginPage key={isLoggedIn ? "logged-in" : "logged-out"} onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/adminDashboard" element={<ProtectedRoute isLoggedIn={isLoggedIn && role === "admin"}><AdminDashboard /></ProtectedRoute>} />
        <Route path="/superAdminDashboard" element={<ProtectedRoute isLoggedIn={isLoggedIn && role === "superadmin"}><SuperAdminDashboard /></ProtectedRoute>}/>
        <Route path="/" element={<ProtectedRoute isLoggedIn={isLoggedIn}><><HeroSection /><FeaturesSection /><CoursesSection /><LearningPathSection /><TestimonialsSection /><SocialSidebar /><CallToAction /></></ProtectedRoute>} />
        <Route path="/icjs" element={<ProtectedRoute isLoggedIn={isLoggedIn}><ICJSTraining /></ProtectedRoute>} />
        <Route path="/cctns" element={<ProtectedRoute isLoggedIn={isLoggedIn}><CCTNSTraining /></ProtectedRoute>} />
        <Route path="/about" element={<ProtectedRoute isLoggedIn={isLoggedIn}><AboutPage /></ProtectedRoute>} />
        <Route path="/latest" element={<ProtectedRoute isLoggedIn={isLoggedIn}><LatestPage /></ProtectedRoute>} />
        <Route path="/instruction" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Instructions onStartTest={startTest} username={username} /></ProtectedRoute>} />
        <Route path="/mylearning" element={<ProtectedRoute isLoggedIn={isLoggedIn}><Mylearning /></ProtectedRoute>} />

        <Route path="/TestPage" element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            {testStarted ? (
              <div className="min-h-screen font-sans">
                <TestPage
                  username={username}
                  questions={questions}
                  currentQuestionIndex={currentQuestionIndex}
                  setCurrentQuestionIndex={setCurrentQuestionIndex}
                  timeLeft={timeLeft}
                  endTest={endTest}
                  saveAndNext={(selectedOptionIndex) => {
                    const newQuestions = [...questions];
                    newQuestions[currentQuestionIndex].userAnswer = selectedOptionIndex;
                    setQuestions(newQuestions);
                    setCurrentQuestionIndex((i) => (i < questions.length - 1 ? i + 1 : 0));
                  }}
                  previousQuestion={() => setCurrentQuestionIndex((i) => (i > 0 ? i - 1 : 0))}
                  clearResponse={() => {
                    const newQuestions = [...questions];
                    newQuestions[currentQuestionIndex].userAnswer = null;
                    setQuestions(newQuestions);
                  }}
                  markForReview={() => {
                    const newQuestions = [...questions];
                    newQuestions[currentQuestionIndex].marked = !newQuestions[currentQuestionIndex].marked;
                    setQuestions(newQuestions);
                  }}
                  saveCurrentAnswer={(selectedOptionIndex) => {
                    const newQuestions = [...questions];
                    newQuestions[currentQuestionIndex].userAnswer = selectedOptionIndex;
                    setQuestions(newQuestions);
                  }}
                />
              </div>
            ) : (
              <Navigate to="/" replace /> 
            )}
          </ProtectedRoute>
        } />

        <Route path="*" element={<ProtectedRoute isLoggedIn={isLoggedIn}><h2>404 - Page Not Found</h2></ProtectedRoute>} />
      </Routes>

      {isLoggedIn && !hideHeaderFooter && <Footer />}
    </>
  );
}

export default App;
