// src/components/QuestionArea.js
import React, { useState, useEffect } from "react";

function QuestionArea({
  question,
  currentQuestionNumber,
  saveAndNext,
  previousQuestion,
  clearResponse,
  markForReview
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Restore previously selected answer if available
    setSelectedOption(question.userAnswer ?? null);
  }, [question]);

  const handleOptionChange = (e) => {
    setSelectedOption(parseInt(e.target.value, 10));
  };

  const handleSaveAndNext = () => {
    saveAndNext(selectedOption);
  };

  const handlePrevious = () => {
    previousQuestion(selectedOption);
  };

  const handleClearResponse = () => {
    setSelectedOption(null);
    clearResponse();
  };

  const handleMarkForReview = () => {
    markForReview(selectedOption);
  };

  return (
    <div className="main-content-area">
      {/* Question Area */}
      <div className="question-section">
        <div className="question-header-row flex justify-between items-center">
          <h3>
            Question <span id="currentQuestionNumber">{currentQuestionNumber}</span>
          </h3>
          <button onClick={handleMarkForReview} className="mark-for-review-btn">
            Mark for Review
          </button>
        </div>

        <div className="question-text-box">
          <p id="questionText">{question.question}</p>
        </div>

        <div className="options-list">
          {question.options.map((option, index) => (
            <div key={index} className="option-item flex items-center space-x-2">
              <input
                type="radio"
                name={`question-${currentQuestionNumber}`}
                id={`option${index + 1}`}
                value={index}
                checked={selectedOption === index}
                onChange={handleOptionChange}
              />
              <label htmlFor={`option${index + 1}`} className="cursor-pointer">
                {option}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons-footer flex justify-between mt-4">
        <button onClick={handlePrevious} className="nav-btn prev-btn">
          Previous
        </button>
        <div className="action-buttons-group flex gap-3">
          <button onClick={handleClearResponse} className="nav-btn clear-response-btn">
            Clear Response
          </button>
          <button onClick={handleSaveAndNext} className="nav-btn save-next-btn">
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionArea;
