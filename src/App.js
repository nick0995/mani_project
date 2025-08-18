import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Papa from 'papaparse';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import CoursesSection from './components/CoursesSection';
import LearningPathSection from './components/LearningPathSection';
import TestimonialsSection from './components/TestimonialsSection';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import LoginModal from './components/LoginModal';
import Instructions from './components/Instructions';
import ICJSTraining from './components/ICJSTraining';
import CCTNSTraining from './components/CCTNSTraining';
import TestPage from './components/TestPage';
import AboutPage from './components/AboutPage';
import { generateCertificate } from './components/generateCertificate';
import ScrollToTop from './components/ScrollToTop';
import Mylearning from './components/mylearning';
import LatestPage from './components/LatestPage';
import SocialSidebar from './components/socialsidebar';
const initialQuestions = [
    {
        question: "Which of the following is the smallest unit of memory?",
        options: ["Kilobyte", "Megabyte", "Gigabyte", "Terabyte"],
        correctAnswer: 0,
        userAnswer: null,
        marked: false
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Markup Language",
            "Hyper Tabular Markup Language",
            "Hyperlink and Text Markup Language"
        ],
        correctAnswer: 0,
        userAnswer: null,
        marked: false
    },
    {
        question: "Which of the following is not a programming language?",
        options: ["Java", "HTML", "CSS", "Windows"],
        correctAnswer: 3,
        userAnswer: null,
        marked: false
    },
    {
        question: "What is the full form of CPU?",
        options: [
            "Central Processing Unit",
            "Central Process Unit",
            "Computer Processing Unit",
            "Computer Process Unit"
        ],
        correctAnswer: 0,
        userAnswer: null,
        marked: false
    },
    {
        question: "Which programming language is known as the 'mother of all languages'?",
        options: ["C", "Fortran", "Assembly", "COBOL"],
        correctAnswer: 3,
        userAnswer: null,
        marked: false
    }
];
const KHOJTraining = () => (
  <section id="khoj" className="tab-container">
    <h2>KHOJ Training</h2>
    <p>This is the KHOJ training content.</p>
  </section>
);

const NewCriminalLawTraining = () => (
  <section id="new-criminal-law" className="tab-container">
    <h2>New Criminal Law Training</h2>
    <p>This is the New Criminal Law training content.</p>
  </section>
);





function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLoginClick = () => setShowLoginModal(true);
  const handleLoginSuccess = (user) => {
    setIsLoggedIn(true);
    setUsername(user);
    setShowLoginModal(false);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
  };

  const location = useLocation();
  const hideHeaderFooter = ['/TestPage', '/instruction' , '/mylearning'].includes(location.pathname);

  const getNavLinkClass = (path) => {
    return location.pathname === path ? 'active' : '';
  };
   const [testStarted, setTestStarted] = useState(false);
    const [questions, setQuestions] = useState(initialQuestions);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
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
    error: (err) => {
      console.error("CSV Load Error", err);
    }
  });
}, []);
  useEffect(() => {
  const handleContextMenu = (e) => {
          if (['/TestPage', '/instruction'].includes(location.pathname)) {
            e.preventDefault(); // Disable right-click only on test/instruction pages
          }
        };

        document.addEventListener('contextmenu', handleContextMenu);
        return () => {
          document.removeEventListener('contextmenu', handleContextMenu);
        };
      }, [location.pathname]);
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

    const startTest = () => {
        setTestStarted(true);
        setCurrentQuestionIndex(0);
        setTimeLeft(60 * 60);
    };

    const saveCurrentAnswer = (selectedOptionIndex) => {
        setQuestions(prevQuestions => {
            const newQuestions = [...prevQuestions];
            newQuestions[currentQuestionIndex] = {
                ...newQuestions[currentQuestionIndex],
                userAnswer: selectedOptionIndex
            };
            return newQuestions;
        });
    };

    const saveAndNext = (selectedOptionIndex) => {
        saveCurrentAnswer(selectedOptionIndex);
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
            setCurrentQuestionIndex(0);
        }
    };

    const previousQuestion = (selectedOptionIndex) => {
        saveCurrentAnswer(selectedOptionIndex);
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prevIndex => prevIndex - 1);
        }
    };

    const clearResponse = () => {
        setQuestions(prevQuestions => {
            const newQuestions = [...prevQuestions];
            newQuestions[currentQuestionIndex] = {
                ...newQuestions[currentQuestionIndex],
                userAnswer: null
            };
            return newQuestions;
        });
    };

    const markForReview = () => {
        setQuestions(prevQuestions => {
            const newQuestions = [...prevQuestions];
            newQuestions[currentQuestionIndex] = {
                ...newQuestions[currentQuestionIndex],
                marked: !newQuestions[currentQuestionIndex].marked
            };
            return newQuestions;
        });
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
        // Generate certificate trigger
        generateCertificate(username, score, percentage);
      }

      setQuestions(initialQuestions);
      setCurrentQuestionIndex(0);
    };

  return ( 
  
    <>
    <ScrollToTop />
      {!hideHeaderFooter && (
        <Navbar
          onLoginClick={handleLoginClick}
          isLoggedIn={isLoggedIn}
          username={username}
          onLogout={handleLogout}
          getNavLinkClass={getNavLinkClass}
        />
      )}

      <Routes>
        <Route path="/" element={
          <>
            <HeroSection />
            <FeaturesSection />
            <CoursesSection />
            <LearningPathSection />
            <TestimonialsSection />
            <SocialSidebar />
            <CallToAction onLoginClick={handleLoginClick} />
          </>
        } />
        <Route path="/icjs" element={<ICJSTraining />} />
        <Route path="/cctns" element={<CCTNSTraining />} />
        <Route path="/khoj" element={<KHOJTraining />} />
        <Route path="/new-criminal-law" element={<NewCriminalLawTraining />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/latest" element={<LatestPage />} />
        <Route path="/instruction" element={<Instructions />} />
        <Route path="/mylearning" element={<Mylearning />} />
        <Route path="/TestPage" element={
        <div className="min-h-screen font-sans">
          {!testStarted ? (
            <Instructions onStartTest={startTest} />
          ) : (
            <TestPage
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              timeLeft={timeLeft}
              endTest={endTest}
              saveAndNext={saveAndNext}
              previousQuestion={previousQuestion}
              clearResponse={clearResponse}
              markForReview={markForReview}
              saveCurrentAnswer={saveCurrentAnswer}
            />
          )}
        </div>
      } />

        <Route path="*" element={
          <div className="container py-5 text-center">
            <h2>404 - Page Not Found</h2>
            <p>The page you are looking for does not exist.</p>
            <Link to="/" className="btn btn-primary">Go to Home</Link>
          </div>
          
        } />
      </Routes>

      {!hideHeaderFooter && <Footer />}

      <LoginModal
        show={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default App;
