import React, { useState } from 'react';
import './styles/ICJSTraining.css';


// function App() {
//   return (
//     <div className="App">
//       <ICJSTraining />
//     </div>
//   );
// }
const CCTNSTraining = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [score, setScore] = useState(null);
  const [certVisible, setCertVisible] = useState(false);
  const participantName = 'John Doe'; // Replace with dynamic value if needed

  const handleSubmitQuiz = () => {
    const calculatedScore = 80; // Replace with real scoring logic
    setScore(calculatedScore);
    if (calculatedScore >= 75) setCertVisible(true);
  };

  const printCertificate = () => {
    window.print();
  };

  return (
    <section id="icjs" className="tab-container">
      <h2>ICJS Training</h2>
      <p>Complete your ICJS training modules and assessment to become certified.</p>

      <div className="tab-buttons">
        {['overview', 'videos', 'materials', 'quiz'].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'overview' && 'Overview'}
            {tab === 'videos' && 'Training Videos'}
            {tab === 'materials' && 'Study Materials'}
            {tab === 'quiz' && 'Quiz'}
          </button>
        ))}
      </div>

      <div className="tab-content active">
        {activeTab === 'overview' && (
          <div>
            <h3>ICJS Overview</h3>
            <p>The Interoperable Criminal Justice System (ICJS) is a project of the Government of India aiming to integrate the pillars of the criminal justice system - Police, Courts, Prisons, Prosecution, and Forensic Labs.</p>

            <div className="video-container">
              <iframe src="https://www.youtube.com/embed/Cd-laWCsVUs" allowFullScreen title="ICJS Overview" />
            </div>

            <h4>Key Objectives</h4>
            <ul>
              <li>Integration of key justice delivery institutions</li>
              <li>Reduction in delays through seamless information sharing</li>
              <li>Improved coordination among stakeholders</li>
              <li>Reduction in manual data entry and paperwork</li>
              <li>Enhanced monitoring and accountability</li>
            </ul>

            <a href="instructionss.html" className="btn">Take Assessment</a>
          </div>
        )}

        {activeTab === 'videos' && (
          <div>
            <h3>ICJS Training Videos</h3>
            <p>Watch these instructional videos to learn about ICJS implementation and usage:</p>
            {[
              { src: 'https://www.youtube.com/watch?v=Cd-laWCsVUs', title: 'Introduction to ICJS' },
              { src: 'https://www.youtube.com/watch?v=Cd-laWCsVUs', title: 'ICJS Data Sharing Mechanism' },
              { src: 'https://www.youtube.com/watch?v=Cd-laWCsVUs', title: 'ICJS Integration with CCTNS' }
            ].map((video, idx) => (
              <div key={idx}>
                <div className="video-container">
                  <iframe src={video.src} allowFullScreen title={video.title} />
                </div>
                <p className="video-title">{video.title}</p>
              </div>
            ))}
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

        {activeTab === 'quiz' && (
          <div className="quiz-container">
            <h3>ICJS QUIZ</h3>
            <p>Test your knowledge of ICJS. Score more than 75% to receive your certification.</p>

            <div className="progress-bar">
              <div className="progress" id="icjs-progress" />
            </div>

            <form id="icjs-quiz-form">
              {[
                {
                  question: '1. What does ICJS stand for?',
                  options: [
                    'Integrated Criminal Justice System',
                    'Interoperable Criminal Justice System',
                    'Indian Criminal Justice Service',
                    'International Criminal Justice Standards'
                  ]
                },
                {
                  question: '2. Which of these is NOT integrated in ICJS?',
                  options: ['Police', 'Courts', 'Media', 'Forensic Labs']
                },
                {
                  question: '3. What is the primary benefit of ICJS?',
                  options: [
                    'Faster delivery of justice',
                    'Reduced paperwork',
                    'Improved coordination among justice institutions',
                    'All of the above'
                  ]
                },
                {
                  question: '4. How does ICJS help in reducing case pendency?',
                  options: [
                    'By automating judgments',
                    'By eliminating the need for lawyers',
                    'By reducing delays through seamless information sharing',
                    'By reducing the number of cases filed'
                  ]
                }
              ].map((q, idx) => (
                <div className="question" key={idx}>
                  <h4>{q.question}</h4>
                  <div className="options">
                    {q.options.map((opt, i) => (
                      <label className="option" key={i}>
                        <input type="radio" name={`q${idx + 1}`} value={opt} /> {opt}
                      </label>
                    ))}
                  </div>
                  <div className="feedback" />
                </div>
              ))}
              <button type="button" className="btn" onClick={handleSubmitQuiz}>Submit Quiz</button>
            </form>

            {certVisible && (
              <div id="icjs-certificate" className="certificate">
                <h2>CERTIFICATE OF COMPLETION</h2>
                <div className="certificate-content">
                  <img
                    src="./CCTNS & ICJS Training Portal_files/eaf5c0a8-be8f-457c-9ec2-d7bb1abdd682.png"
                    alt="Seal"
                    className="certificate-logo"
                  />
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

export default CCTNSTraining;
