// src/components/TestPage.jsx
import React, { useState, useEffect } from "react";
import QuestionPalette from "./QuestionPalette";
import QuestionArea from "./QuestionArea";
import axios from "axios";

function TestPage({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  timeLeft,
  endTest,
  saveAndNext,
  previousQuestion,
  clearResponse,
  markForReview,
  saveCurrentAnswer,
}) {
  const [user, setUser] = useState(null);
  const [assessmentTitle, setAssessmentTitle] = useState("Loading...");

  // 🌐 Fetch logged-in user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);

        // Fetch assigned assessment for this user
        const assignedRes = await axios.get(
          `http://localhost:5000/api/assessments/assigned/${res.data.id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (assignedRes.data.length > 0) {
          setAssessmentTitle(
            assignedRes.data[0].assessment_title || "Assessment"
          );
        } else {
          setAssessmentTitle("Assessment");
        }
      } catch (err) {
        console.error("❌ Error fetching user or assessment:", err);
      }
    };
    fetchUser();
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div id="testPage" className="max-w-6xl mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-800 text-white p-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{assessmentTitle}</h1>
          <div className="flex items-center gap-4">
            <div className="text-gray-100 font-medium">
              👤 {user?.username || "Loading..."}
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-blue-700 px-4 py-1 rounded-full font-bold text-white">
                ⏱ {`${minutes.toString().padStart(2, "0")}:${seconds
                  .toString()
                  .padStart(2, "0")}`}
              </div>
              <button
                onClick={endTest}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full font-medium transition"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>

        {/* Main Layout */}
        <div className="flex flex-col md:flex-row">
          {/* Question Navigation */}
          <QuestionPalette
            questions={questions}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            saveCurrentAnswer={saveCurrentAnswer}
          />

          {/* Main Content */}
          <QuestionArea
            question={questions[currentQuestionIndex]}
            currentQuestionNumber={currentQuestionIndex + 1}
            saveAndNext={saveAndNext}
            previousQuestion={previousQuestion}
            clearResponse={clearResponse}
            markForReview={markForReview}
          />
        </div>
      </div>
    </div>
  );
}

export default TestPage;
