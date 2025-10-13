// src/components/QuestionPalette.jsx
import React from "react";

function QuestionPalette({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  saveCurrentAnswer,
}) {
  const handleQuestionClick = (index) => {
    saveCurrentAnswer(questions[currentQuestionIndex].userAnswer);
    setCurrentQuestionIndex(index);
  };

  return (
    <div className="bg-gray-50 p-4 border-r md:w-1/4">
      <h3 className="text-lg font-semibold text-center mb-4">Question Palette</h3>
      <div className="grid grid-cols-5 gap-2 mb-6">
        {questions.map((question, index) => {
          let buttonClass =
            "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition";
          if (index === currentQuestionIndex)
            buttonClass += " bg-blue-500 text-white";
          else if (question.userAnswer !== null)
            buttonClass += " bg-green-500 text-white";
          else if (question.marked)
            buttonClass += " bg-yellow-500 text-white";
          else buttonClass += " bg-gray-200 text-black hover:bg-gray-300";

          return (
            <button
              key={index}
              className={buttonClass}
              onClick={() => handleQuestionClick(index)}
            >
              {index + 1}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t">
        <h3 className="text-md font-semibold mb-3">Legend</h3>
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 bg-blue-500 rounded mr-2"></div>
          <span className="text-sm">Current Question</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 bg-gray-200 rounded mr-2"></div>
          <span className="text-sm">Unanswered</span>
        </div>
        <div className="flex items-center mb-2">
          <div className="w-4 h-4 bg-green-500 rounded mr-2"></div>
          <span className="text-sm">Answered</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-yellow-500 rounded mr-2"></div>
          <span className="text-sm">Marked for Review</span>
        </div>
      </div>
    </div>
  );
}

export default QuestionPalette;
