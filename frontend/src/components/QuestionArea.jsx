// src/components/QuestionArea.js
import React, { useState, useEffect } from 'react';

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
        setSelectedOption(question.userAnswer);
    }, [question]);

    const handleOptionChange = (e) => {
        setSelectedOption(parseInt(e.target.value));
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
        markForReview();
    };

    return (
        <div className="main-content-area">
            {/* Question Area */}
            <div className="question-section">
                <div className="question-header-row">
                    <h3>Question <span id="currentQuestionNumber">{currentQuestionNumber}</span></h3>
                    <div className="flex space-x-2">
                        <button onClick={handleMarkForReview} className="mark-for-review-btn">
                            Mark for Review
                        </button>
                    </div>
                </div>

                <div className="question-text-box">
                    <p id="questionText">{question.question}</p>
                </div>

                <div className="options-list">
                    {question.options.map((option, index) => (
                        <div key={index} className="option-item">
                            <input
                                type="radio"
                                name="options"
                                id={`option${index + 1}`}
                                value={index}
                                checked={selectedOption === index}
                                onChange={handleOptionChange}
                            />
                            <label htmlFor={`option${index + 1}`} className="cursor-pointer">
                                <span>{option}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="navigation-buttons-footer">
                <div>
                    <button onClick={handlePrevious} className="nav-btn prev-btn">
                        Previous
                    </button>
                </div>
                <div className="action-buttons-group">
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