// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './styles/ICJSTraining.css';


// // function App() {
// //   return (
// //     <div className="App">
// //       <ICJSTraining />
// //     </div>
// //   );
// // }
// const ICJSTraining = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [score, setScore] = useState(null);
//   const [certVisible, setCertVisible] = useState(false);
//   const participantName = 'John Doe'; // Replace with dynamic value if needed

//   const handleSubmitQuiz = () => {
//     const calculatedScore = 80; // Replace with real scoring logic
//     setScore(calculatedScore);
//     if (calculatedScore >= 75) setCertVisible(true);
//   };

//   const printCertificate = () => {
//     window.print();
//   };

//   return (
//     <section id="icjs" className="tab-container">
//       <h2>ICJS Training</h2>
//       <p>Complete your ICJS training modules and assessment to become certified.</p>

//       <div className="tab-buttons">
//         {['overview','materials', 'quiz'].map((tab) => (
//           <button
//             key={tab}
//             className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab === 'overview' && 'Overview'}
//             {/* {tab === 'videos' && 'Training Videos'} */}
//             {tab === 'materials' && 'Study Materials'}
//             {tab === 'quiz' && 'Quiz'}
//           </button>
//         ))}
//       </div>

//       <div className="tab-content active">
//         {activeTab === 'overview' && (
//           <div>
//             <h3>ICJS Overview</h3>
//             <p>The Interoperable Criminal Justice System (ICJS) is a project of the Government of India aiming to integrate the pillars of the criminal justice system - Police, Courts, Prisons, Prosecution, and Forensic Labs.</p>

//             <div className="video-container">
//               <iframe src="https://www.youtube.com/embed/Cd-laWCsVUs" allowFullScreen title="ICJS Overview" />
//             </div>

//             <h4>Key Objectives</h4>
//             <ul>
//               <li>Integration of key justice delivery institutions</li>
//               <li>Reduction in delays through seamless information sharing</li>
//               <li>Improved coordination among stakeholders</li>
//               <li>Reduction in manual data entry and paperwork</li>
//               <li>Enhanced monitoring and accountability</li>
//             </ul>

//             <button className="btn btn-outline-primary" onClick={() => window.open("/TestPage", "_blank")}>
//               Take Assessment
//             </button>

//           </div>
//         )}

//         {/* {activeTab === 'videos' && (
//           <div>
//             <h3>ICJS Training Videos</h3>
//             <p>Watch these instructional videos to learn about ICJS implementation and usage:</p>
//             {[
//               { src: 'https://www.youtube.com/watch?v=Cd-laWCsVUs', title: 'Introduction to ICJS' },
//               { src: 'https://www.youtube.com/watch?v=Cd-laWCsVUs', title: 'ICJS Data Sharing Mechanism' },
//               { src: 'https://www.youtube.com/watch?v=Cd-laWCsVUs', title: 'ICJS Integration with CCTNS' }
//             ].map((video, idx) => (
//               <div key={idx}>
//                 <div className="video-container">
//                   <iframe src={video.src} allowFullScreen title={video.title} />
//                 </div>
//                 <p className="video-title">{video.title}</p>
//               </div>
//             ))}
//           </div>
//         )} */}

//         {activeTab === 'materials' && (
//           <div>
//             <h3>ICJS Study Materials</h3>
//             <p>Download these resources for detailed information about ICJS:</p>
//             {[
//               { title: 'ICJS User Manual', desc: 'Complete guide to using the ICJS software' },
//               { title: 'ICJS Implementation Roadmap', desc: 'Phases and timelines for national rollout' },
//               { title: 'ICJS Data Standards', desc: 'Technical specifications for integration' }
//             ].map((doc, idx) => (
//               <div className="resource-card" key={idx}>
//                 <div className="resource-icon">📄</div>
//                 <div>
//                   <h4>{doc.title}</h4>
//                   <p>{doc.desc}</p>
//                   <a href="#" className="btn btn-outline">Download PDF</a>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}

//         {activeTab === 'quiz' && (
//           <div className="quiz-container">
//             <h3>ICJS QUIZ</h3>
//             <p>Test your knowledge of ICJS. Score more than 75% to receive your certification.</p>

//             <div className="progress-bar">
//               <div className="progress" id="icjs-progress" />
//             </div>

//             <form id="icjs-quiz-form">
//               {[
//                 {
//                   question: '1. What does ICJS stand for?',
//                   options: [
//                     'Integrated Criminal Justice System',
//                     'Interoperable Criminal Justice System',
//                     'Indian Criminal Justice Service',
//                     'International Criminal Justice Standards'
//                   ]
//                 },
//                 {
//                   question: '2. Which of these is NOT integrated in ICJS?',
//                   options: ['Police', 'Courts', 'Media', 'Forensic Labs']
//                 },
//                 {
//                   question: '3. What is the primary benefit of ICJS?',
//                   options: [
//                     'Faster delivery of justice',
//                     'Reduced paperwork',
//                     'Improved coordination among justice institutions',
//                     'All of the above'
//                   ]
//                 },
//                 {
//                   question: '4. How does ICJS help in reducing case pendency?',
//                   options: [
//                     'By automating judgments',
//                     'By eliminating the need for lawyers',
//                     'By reducing delays through seamless information sharing',
//                     'By reducing the number of cases filed'
//                   ]
//                 }
//               ].map((q, idx) => (
//                 <div className="question" key={idx}>
//                   <h4>{q.question}</h4>
//                   <div className="options">
//                     {q.options.map((opt, i) => (
//                       <label className="option" key={i}>
//                         <input type="radio" name={`q${idx + 1}`} value={opt} /> {opt}
//                       </label>
//                     ))}
//                   </div>
//                   <div className="feedback" />
//                 </div>
//               ))}
//               <button type="button" className="btn" onClick={handleSubmitQuiz}>Submit Quiz</button>
//             </form>

//             {certVisible && (
//               <div id="icjs-certificate" className="certificate">
//                 <h2>CERTIFICATE OF COMPLETION</h2>
//                 <div className="certificate-content">
//                   <img
//                     src="./CCTNS & ICJS Training Portal_files/eaf5c0a8-be8f-457c-9ec2-d7bb1abdd682.png"
//                     alt="Seal"
//                     className="certificate-logo"
//                   />
//                   <div className="certificate-details">
//                     <p>This is to certify that</p>
//                     <p className="certificate-name">{participantName}</p>
//                     <p>has successfully completed the training program on</p>
//                     <p><strong>Interoperable Criminal Justice System (ICJS)</strong></p>
//                     <p>with a score of <strong>{score}</strong>%</p>
//                     <p className="certificate-date">{new Date().toLocaleDateString()}</p>
//                   </div>
//                   <div className="certificate-signature">
//                     <div className="signature">Training Coordinator</div>
//                     <div className="signature">Director</div>
//                   </div>
//                 </div>
//                 <button onClick={printCertificate} className="btn">Print Certificate</button>
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </section>
//   );
// };

// export default ICJSTraining;
import React, { useState, useMemo, useRef } from 'react';

const ICJSTraining = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [score, setScore] = useState(null);
  const [certVisible, setCertVisible] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const progressRef = useRef(null);
  const participantName = 'Username';

  const questions = useMemo(() => ([
    {
      question: "What does ICJS stand for?",
      options: [
        "Integrated Criminal Justice System",
        "Interoperable Criminal Justice System",
        "Indian Criminal Justice Service",
        "International Criminal Justice Standards"
      ]
    },
    {
      question: "Which of these is NOT integrated in ICJS?",
      options: ["Police", "Courts", "Media", "Forensic Labs"]
    },
    {
      question: "What is the primary benefit of ICJS?",
      options: [
        "Faster delivery of justice",
        "Reduced paperwork",
        "Improved coordination among justice institutions",
        "All of the above"
      ]
    },
    {
      question: "How does ICJS help in reducing case pendency?",
      options: [
        "By automating judgments",
        "By eliminating the need for lawyers",
        "By reducing delays through seamless information sharing",
        "By reducing the number of cases filed"
      ]
    }
  ].sort(() => Math.random() - 0.5)), []);

  const handleSubmitQuiz = () => {
    const correctAnswers = [
      "Interoperable Criminal Justice System",
      "Media",
      "All of the above",
      "By reducing delays through seamless information sharing"
    ];

    const userScore = questions.reduce((acc, q, idx) => {
      return acc + (answers[idx] === correctAnswers[idx] ? 1 : 0);
    }, 0);

    const calculatedScore = Math.round((userScore / questions.length) * 100);

    setScore(calculatedScore);
    setCertVisible(calculatedScore >= 75);
    if (progressRef.current) {
      progressRef.current.style.width = `${calculatedScore}%`;
    }
  };

  const totalQuestions = questions.length;
  const getProgress = () => {
    const answeredCount = Object.keys(answers).length;
    return Math.round((answeredCount / totalQuestions) * 100);
  };

  const printCertificate = () => window.print();

  return (
    <section id="icjs" className="tab-container">
      <div className='section-title'>
        <h2>ICJS Training</h2>
        <p>Complete your ICJS training modules and assessment to become certified.</p>
      </div>

      <div className="tab-buttons">
        <div className='tab_btn_setting'>
          {['overview', 'materials', 'sample'].map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'sample' ? 'Sample Questions' : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className='custom_btn'>
          <button className="tab-btn active" onClick={() => window.open("/TestPage", "_blank")}>
            Take Assessment
          </button>
        </div>
      </div>

      <div className="tab-content fade-slide">
        {activeTab === 'overview' && (
          <div>
            <h3>ICJS Overview</h3>
            <p>The Interoperable Criminal Justice System (ICJS) is a project aiming to integrate the pillars of the criminal justice system.</p>
            <div className="video-container">
              <iframe
                src="https://www.youtube.com/embed/Cd-laWCsVUs"
                allowFullScreen
                title="ICJS Overview"
              />
            </div>
            <h4>Key Objectives</h4>
            <ul>
              <li>Integration of key justice delivery institutions</li>
              <li>Reduction in delays through seamless information sharing</li>
              <li>Improved coordination among stakeholders</li>
              <li>Reduction in manual data entry and paperwork</li>
              <li>Enhanced monitoring and accountability</li>
            </ul>
          </div>
        )}

        {activeTab === 'materials' && (
          <div>
            <h3>ICJS Study Materials</h3>
            <p>Download these resources for detailed information about ICJS:</p>
            {[
              { title: 'ICJS User Manual', desc: 'Complete guide to using the ICJS software' },
              { title: 'ICJS Implementation Roadmap', desc: 'Phases and timelines for national rollout' },
              { title: 'ICJS Data Standards', desc: 'Technical specifications for integration' }
            ].map((doc, idx) => (
              <div className="resource-card" key={idx}>
                <div className="resource-icon">📄</div>
                <div>
                  <h4>{doc.title}</h4>
                  <p>{doc.desc}</p>
                  <a href="#" className="btn btn-outline">Download PDF</a>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'sample' && (
          <div className="quiz-container">
            <h3>Sample Questions</h3>
            <p>Test your knowledge of ICJS. Score more than 75% to receive your certification.</p>

            <div className="progress-bar">
              <div className="progress" style={{ width: `${getProgress()}%` }} />
            </div>
            <p>{getProgress()}% Completed</p>

            <form>
              {questions.map((q, idx) => (
                currentQuestion === idx && (
                  <div className="question" key={idx}>
                    <p><strong>Question {currentQuestion + 1} of {questions.length}</strong></p>
                    <h4>{q.question}</h4>
                    <div className="options">
                      {q.options.map((opt, i) => (
                        <label className="option" key={i}>
                          <input
                            className='form_input'
                            type="radio"
                            name={`q${idx}`}
                            value={opt}
                            checked={answers[idx] === opt}
                            onChange={() => setAnswers({ ...answers, [idx]: opt })}
                          />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>
                )
              ))}

              <div className="quiz-nav">
                {currentQuestion > 0 && (
                  <button type="button" className="btn btn-outline-primary ms-3" onClick={() => setCurrentQuestion(currentQuestion - 1)}>
                    Previous
                  </button>
                )}
                {currentQuestion < questions.length - 1 ? (
                  <button type="button" className="btn btn-outline-primary ms-3" onClick={() => setCurrentQuestion(currentQuestion + 1)}>
                    Next
                  </button>
                ) : (
                  <button type="button" className="btn btn-outline-primary ms-3" onClick={handleSubmitQuiz}>
                    Submit Quiz
                  </button>
                )}
              </div>
            </form>

            {certVisible && (
              <div className="certificate">
                <h2>CERTIFICATE OF COMPLETION</h2>
                <div className="certificate-content">
                  <img src="https://placehold.co/80x80" alt="Seal" className="certificate-logo" />
                  <div className="certificate-details">
                    <p>This is to certify that</p>
                    <p className="certificate-name">{participantName}</p>
                    <p>has successfully completed the training program on</p>
                    <p><strong>Interoperable Criminal Justice System (ICJS)</strong></p>
                    <p>with a score of <strong>{score}</strong>%</p>
                    <p className="certificate-date">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="certificate-signature">
                    <div className="signature">Training Coordinator</div>
                    <div className="signature">Director</div>
                  </div>
                </div>
                <button onClick={printCertificate} className="btn">Print Certificate</button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default ICJSTraining;

