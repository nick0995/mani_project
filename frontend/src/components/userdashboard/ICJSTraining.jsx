import React, { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./ICJSTraining.css"; // custom styles

const ICJSTraining = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [score, setScore] = useState(null);
  const [certVisible, setCertVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const progressRef = useRef(null);
  const participantName = "Username";
  const navigate = useNavigate();

  const questions = useMemo(
    () =>
      [
        {
          question: "What does ICJS stand for?",
          options: [
            "Integrated Criminal Justice System",
            "Interoperable Criminal Justice System",
            "Indian Criminal Justice Service",
            "International Criminal Justice Standards",
          ],
          correctAnswer: "Interoperable Criminal Justice System"
        },
        {
          question: "Which of these is NOT integrated in ICJS?",
          options: ["Police", "Courts", "Media", "Forensic Labs"],
          correctAnswer: "Media"
        },
        {
          question: "What is the primary benefit of ICJS?",
          options: [
            "Faster delivery of justice",
            "Reduced paperwork",
            "Improved coordination among justice institutions",
            "All of the above",
          ],
          correctAnswer: "All of the above"
        },
        {
          question: "How does ICJS help in reducing case pendency?",
          options: [
            "By automating judgments",
            "By eliminating the need for lawyers",
            "By reducing delays through seamless information sharing",
            "By reducing the number of cases filed",
          ],
          correctAnswer: "By reducing delays through seamless information sharing"
        },
      ].sort(() => Math.random() - 0.5),
    []
  );

  const handleSubmitQuiz = () => {
    const userScore = questions.reduce(
      (acc, q, idx) => acc + (answers[idx] === q.correctAnswer ? 1 : 0),
      0
    );

    const calculatedScore = Math.round((userScore / questions.length) * 100);

    setScore(calculatedScore);
    setCertVisible(calculatedScore >= 75);
    setSubmitted(true);
    
    if (progressRef.current) {
      progressRef.current.style.width = `${calculatedScore}%`;
    }
  };

  const totalQuestions = questions.length;
  const getProgress = () =>
    Math.round((Object.keys(answers).length / totalQuestions) * 100);

  const printCertificate = () => window.print();

  const restartQuiz = () => {
    setScore(null);
    setCertVisible(false);
    setCurrentQuestion(0);
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <section className="icjs-container">
      {/* Hero Banner */}
      <div className="icjs-hero">
        <img src="./images/aa.jpg" alt="ICJS Banner" />
        </div>
        <div className="hero-text">
          <h1>ICJS Training Program</h1>
          <p>Digital transformation of India's Criminal Justice System</p>
        </div>
      

      {/* Tabs */}
      <div className="icjs-tabs">
        <div className="icjs-tab-buttons">
          {["overview", "materials", "sample"].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "sample"
                ? "Sample Questions"
                : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
        <button onClick={() => navigate("/instruction")} className="primary-btn">
          🚀 Take Assessment
        </button>
      </div>

      {/* Tab Content */}
      <div>
        {/* Overview */}
        {activeTab === "overview" && (
          <div className="overview-section">
            <h2>ICJS Overview</h2>
            <div className="overview-grid">
              <div>
                <p>
                  The Interoperable Criminal Justice System (ICJS) integrates all
                  pillars of justice to deliver faster, transparent, and efficient
                  services.
                </p>
                <ul>
                  <li>⚖️ Integration of justice delivery institutions</li>
                  <li>📊 Faster case disposal through information sharing</li>
                  <li>🔍 Improved coordination & transparency</li>
                  <li>📑 Less paperwork, more efficiency</li>
                  <li>📡 Better monitoring & accountability</li>
                </ul>
              </div>
              <div className="video-container">
                <iframe
                  src="https://www.youtube.com/embed/YkkjY--0Kq4"
                  allowFullScreen
                  title="ICJS Overview"
                />
              </div>
            </div>
          </div>
        )}

        {/* Materials */}
        {activeTab === "materials" && (
          <div className="materials-section">
            <h2>Study Materials</h2>
            <div className="resources-grid">
              {[
                {
                  title: "ICJS User Manual",
                  desc: "Complete guide to using the ICJS software",
                  img: "/images/manual.png",
                },
                {
                  title: "ICJS Roadmap",
                  desc: "Phases and timelines for national rollout",
                  img: "/images/roadmap.png",
                },
                {
                  title: "ICJS Data Standards",
                  desc: "Technical specifications for integration",
                  img: "/images/datastandard.png",
                },
              ].map((doc, idx) => (
                <div className="resource-card" key={idx}>
                  <img src={doc.img} alt={doc.title} />
                  <div>
                    <h4>{doc.title}</h4>
                    <p>{doc.desc}</p>
                    <a href="#">⬇️ Download PDF</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sample Questions */}
        {activeTab === "sample" && (
          <div className="quiz-section">
            <h2>Sample Questions</h2>
            <p>Score 75% or above to earn your certificate.</p>

            {submitted && score !== null && (
              <div className="score-display">
                <h3>Your Score: {score}%</h3>
                {score >= 75 ? (
                  <p className="success-message">Congratulations! You passed the quiz.</p>
                ) : (
                  <p className="fail-message">You need at least 75% to pass. Try again!</p>
                )}
              </div>
            )}

            {/* Progress */}
            <div className="progress-bar">
              <div
                ref={progressRef}
                className="progress"
                style={{ width: `${submitted ? score : getProgress()}%` }}
              />
            </div>
            <p className="progress-text">
              {submitted ? `Score: ${score}%` : `${getProgress()}% Completed`}
            </p>

            {/* Question */}
            {!submitted && questions.map(
              (q, idx) =>
                currentQuestion === idx && (
                  <div className="question-card" key={idx}>
                    <p className="question-count">
                      Question {currentQuestion + 1} of {questions.length}
                    </p>
                    <h4>{q.question}</h4>
                    <div className="options">
                      {q.options.map((opt, i) => (
                        <label className="option" key={i}>
                          <input
                            type="radio"
                            name={`q${idx}`}
                            value={opt}
                            checked={answers[idx] === opt}
                            onChange={() =>
                              setAnswers({ ...answers, [idx]: opt })
                            }
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>
                )
            )}

            {/* Results after submission */}
            {submitted && (
              <div className="quiz-results">
                <h3>Quiz Results</h3>
                {questions.map((q, idx) => {
                  const isCorrect = answers[idx] === q.correctAnswer;
                  return (
                    <div key={idx} className={`result-item ${isCorrect ? 'correct' : 'incorrect'}`}>
                      <h4>{q.question}</h4>
                      <p>Your answer: {answers[idx] || "Not answered"}</p>
                      {!isCorrect && <p>Correct answer: {q.correctAnswer}</p>}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Navigation */}
            <div className="quiz-nav">
              {!submitted ? (
                <>
                  {currentQuestion > 0 && (
                    <button
                      onClick={() => setCurrentQuestion(currentQuestion - 1)}
                      className="secondary-btn"
                    >
                      ⬅ Previous
                    </button>
                  )}
                  {currentQuestion < questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestion(currentQuestion + 1)}
                      className="primary-btn"
                    >
                      Next ➡
                    </button>
                  ) : (
                    <button onClick={handleSubmitQuiz} className="success-btn">
                      ✅ Submit Quiz
                    </button>
                  )}
                </>
              ) : (
                <button onClick={restartQuiz} className="primary-btn">
                  🔄 Restart Quiz
                </button>
              )}
            </div>

            {/* Certificate */}
            {certVisible && (
              <div className="certificate">
                <img src="./images/b.jpeg" alt="Certificate" className="cert-bg" />
                <div className="certificate-content">
                  <h2>Certificate of Completion</h2>
                  <p>
                    This certifies that <strong>{participantName}</strong> has
                    successfully completed the ICJS Training Program with a score
                    of <strong>{score}%</strong>.
                  </p>
                  <p>Date: {new Date().toLocaleDateString()}</p>
                  <div className="certificate-sign">
                    <span>Coordinator</span>
                    <span>Director</span>
                  </div>
                  <button onClick={printCertificate} className="primary-btn">
                    🖨 Print Certificate
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ICJSTraining;