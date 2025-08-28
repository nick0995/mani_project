// src/components/QuestionPalette.js
import React from 'react';

function QuestionPalette({ questions, currentQuestionIndex, setCurrentQuestionIndex, saveCurrentAnswer }) {
    const handleQuestionClick = (index) => {
        saveCurrentAnswer(questions[currentQuestionIndex].userAnswer);
        setCurrentQuestionIndex(index);
    };

    return (
        <div className="question-palette-panel">
            <h3>Question Palette</h3>
            <div className="question-grid">
                {questions.map((question, index) => {
                    let buttonClass = 'question-nav-btn';
                    if (index === currentQuestionIndex) {
                        buttonClass += ' active';
                    } else if (question.userAnswer !== null) {
                        buttonClass += ' answered';
                    } else if (question.marked) {
                        buttonClass += ' marked';
                    }

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

            <div className="legend-section">
                <h3>Legend</h3>
                <div className="legend-item">
                    <div className="legend-color-box blue"></div>
                    <span>Current Question</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color-box gray"></div>
                    <span>Unanswered</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color-box green"></div>
                    <span>Answered</span>
                </div>
                <div className="legend-item">
                    <div className="legend-color-box yellow"></div>
                    <span>Marked for Review</span>
                </div>
            </div>
        </div>
    );
}

export default QuestionPalette;