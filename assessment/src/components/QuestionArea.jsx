// src/components/QuestionArea.jsx
import React, { useState, useEffect } from "react";

function QuestionArea({
  question,
  currentQuestionNumber,
  saveAndNext,
  previousQuestion,
  clearResponse,
  markForReview,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    setSelectedOption(question.userAnswer ?? null);
  }, [question]);

  return (
    <div className="p-6 md:w-3/4">
      {/* Question Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-blue-800">
            Question <span>{currentQuestionNumber}</span>
          </h3>
          <button
            onClick={() => markForReview(selectedOption)}
            className="text-yellow-800 bg-yellow-100 hover:bg-yellow-200 text-sm px-3 py-1 rounded transition"
          >
            Mark for Review
          </button>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-gray-800">{question.question}</p>
        </div>

        <div className="flex flex-col gap-3">
          {question.options.map((option, index) => (
            <label key={index} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name={`question-${currentQuestionNumber}`}
                value={index}
                checked={selectedOption === index}
                onChange={() => setSelectedOption(index)}
                className="accent-blue-600"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between items-center border-t border-gray-200 pt-4">
        <button
          onClick={previousQuestion}
          className="bg-blue-100 text-blue-800 hover:bg-blue-200 px-4 py-2 rounded transition"
        >
          Previous
        </button>
        <div className="flex gap-3">
          <button
            onClick={() => {
              setSelectedOption(null);
              clearResponse();
            }}
            className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-2 rounded transition"
          >
            Clear Response
          </button>
          <button
            onClick={() => saveAndNext(selectedOption)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded transition"
          >
            Save & Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuestionArea;
