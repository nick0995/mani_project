// import React, { useState, useEffect } from 'react';
// import Papa from 'papaparse';

// const TestPage = () => {
//   const [questions, setQuestions] = useState([]);
//   const [totalTime, setTotalTime] = useState(10 * 60); // 10 minutes
//   const [answers, setAnswers] = useState({});

//   // ⬇️ Load CSV on mount
//   useEffect(() => {
//     Papa.parse('/question.csv', {
//       download: true,
//       header: true,
//       complete: (result) => {
//         setQuestions(result.data.filter(q => q.question)); // remove empty rows
//       },
//       error: (err) => {
//         console.error("CSV Parse Error:", err);
//       }
//     });
//   }, []);

//   // ⏱ Timer logic
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTotalTime(prev => {
//         if (prev <= 0) {
//           clearInterval(interval);
//           alert("Time is up!");
//           handleSubmit();
//           return 0;
//         }
//         return prev - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleChange = (id, value) => {
//     setAnswers(prev => ({
//       ...prev,
//       [id]: value
//     }));
//   };

//   const handleSubmit = () => {
//     console.log("Submitted answers:", answers);
//     alert("Test submitted successfully!");
//   };

//   const formatTime = (t) => `${String(Math.floor(t / 60)).padStart(2, '0')}:${String(t % 60).padStart(2, '0')}`;

//   return (
//     <div style={{ fontFamily: 'Arial', padding: '20px', background: '#eef2f5', minHeight: '100vh' }}>
//       <h2>Test Questions</h2>
//       <form onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
//         {questions.map((q, idx) => (
//           <div key={idx} style={{ marginBottom: '20px', background: '#fff', padding: '20px', borderRadius: '8px' }}>
//             <p><strong>{idx + 1}. {q.question}</strong></p>
//             <div><label><input type="radio" name={`q${idx}`} value="A" onChange={() => handleChange(q.id || idx, 'A')} /> {q.option_a}</label></div>
//             <div><label><input type="radio" name={`q${idx}`} value="B" onChange={() => handleChange(q.id || idx, 'B')} /> {q.option_b}</label></div>
//             <div><label><input type="radio" name={`q${idx}`} value="C" onChange={() => handleChange(q.id || idx, 'C')} /> {q.option_c}</label></div>
//             <div><label><input type="radio" name={`q${idx}`} value="D" onChange={() => handleChange(q.id || idx, 'D')} /> {q.option_d}</label></div>
//           </div>
//         ))}
//         <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>Submit</button>
//       </form>
//       <div style={{ marginTop: '20px', textAlign: 'right', fontWeight: 'bold', fontSize: '18px' }}>
//         ⏱ Time Left: {formatTime(totalTime)}
//       </div>
//     </div>
//   );
// };

// export default TestPage;
// / src/components/TestPage.js
import React from 'react';
import QuestionPalette from './QuestionPalette';
import QuestionArea from './QuestionArea';
function TestPage({
    username,
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    timeLeft,
    endTest,
    saveAndNext,
    previousQuestion,
    clearResponse,
    markForReview,
    saveCurrentAnswer
}) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return (
        <div id="testPage" className="test-page-container">
            <div className="test-content-wrapper">
                {/* Header */}
                <div className="test-header flex justify-between items-center">
                    <h1>ICJS Test</h1>
                    <div className="flex items-center gap-6">
                        <div className="text-gray-800 font-medium">
                          👤 {username}
                        </div>
                        <div className="timer-container">
                            <div className="timer-display font-bold text-red-600">
                                ⏱ {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
                            </div>
                        </div>
                        <button onClick={endTest} className="submit-test-btn">
                            Submit Test
                        </button>
                    </div>
                </div>
                <div className="test-main-layout">
                    {/* Question Navigation Panel */}
                    <QuestionPalette
                        questions={questions}
                        currentQuestionIndex={currentQuestionIndex}
                        setCurrentQuestionIndex={setCurrentQuestionIndex}
                        saveCurrentAnswer={saveCurrentAnswer}
                    />
                    {/* Main Content Area */}
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
