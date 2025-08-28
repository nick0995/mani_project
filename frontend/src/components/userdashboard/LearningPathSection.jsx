// import React from 'react';

// const LearningPathSection = () => {
//   return (
//     <section className="learning-path">
//       <div className="container">
//         <div className="section-title">
//           <h2>Course Structure</h2>
//           <p>Each course follows this comprehensive learning path</p>
//         </div>

//         <div className="row">
//           <div className="col-md-6 col-lg-3">
//             <div className="path-card">
//               <div className="path-icon">
//                 <i className="fas fa-video"></i>
//               </div>
//               <h3>Training Videos</h3>
//               <p>High-quality instructional videos covering all course concepts and practical applications.</p>
//               <a href="#" className="btn btn-sm btn-outline-primary">Learn More</a>
//             </div>
//           </div>

//           <div className="col-md-6 col-lg-3">
//             <div className="path-card">
//               <div className="path-icon">
//                 <i className="fas fa-book"></i>
//               </div>
//               <h3>Study Material</h3>
//               <p>Downloadable resources including eBooks, case studies, templates and cheat sheets.</p>
//               <a href="#" className="btn btn-sm btn-outline-primary">Learn More</a>
//             </div>
//           </div>

//           <div className="col-md-6 col-lg-3">
//             <div className="path-card">
//               <div className="path-icon">
//                 <i className="fas fa-question-circle"></i>
//               </div>
//               <h3>Practice Quizzes</h3>
//               <p>Test your knowledge with interactive quizzes and get instant feedback on your answers.</p>
//               <a href="#" className="btn btn-sm btn-outline-primary">Learn More</a>
//             </div>
//           </div>

//           <div className="col-md-6 col-lg-3">
//             <div className="path-card">
//               <div className="path-icon">
//                 <i className="fas fa-tasks"></i>
//               </div>
//               <h3>Final Assessment</h3>
//               <p>Comprehensive exam that must be passed to receive your course certification for boost your skills.</p>
//               <a href="#" className="btn btn-sm btn-outline-primary">Learn More</a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default LearningPathSection;
// import React, { useState, useEffect, useRef } from 'react';
// import { FaVideo, FaBook, FaQuestionCircle, FaTasks } from 'react-icons/fa';

// const items = [
//   {
//     icon: <FaVideo className="icon" />,
//     title: 'Training Videos',
//     description: 'High-quality instructional videos covering all course concepts and practical applications.',
//   },
//   {
//     icon: <FaBook className="icon" />,
//     title: 'Study Material',
//     description: 'Downloadable resources including eBooks, case studies, templates and cheat sheets.',
//   },
//   {
//     icon: <FaQuestionCircle className="icon" />,
//     title: 'Practice Quizzes',
//     description: 'Test your knowledge with interactive quizzes and get instant feedback on your answers.',
//   },
//   {
//     icon: <FaTasks className="icon" />,
//     title: 'Final Assessment',
//     description: 'Comprehensive exam that must be passed to receive your course certification for skill boost.',
//   },
// ];

// const speakText = (text) => {
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = 'en-US';
//   speechSynthesis.speak(utterance);
// };

// const LearningPathSection = () => {
//   const [activeTooltip, setActiveTooltip] = useState(null);
//   const tooltipRef = useRef(null);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
//         setActiveTooltip(null);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <section className="learning-path-section">
//       <div className="container">
//         <div className="header">
//           <h2>Course Structure</h2>
//           <p>Each course follows this comprehensive learning path</p>
//         </div>

//         <div className="circle-container">
//           <div className="spin-container">
//             {items.map((item, index) => {
//               const angle = (360 / items.length) * index;
//               const radius = 160;
//               const x = radius * Math.cos((angle * Math.PI) / 180) + 210;
//               const y = radius * Math.sin((angle * Math.PI) / 180) + 210;
//               const rotate = angle + 90;

//               return (
//                 <div
//                   key={index}
//                   className="card"
//                   style={{
//                     top: `${y}px`,
//                     left: `${x}px`,
//                     transform: `translate(-50%, -50%) rotate(${rotate}deg)`
//                   }}
//                   onClick={() => {
//                     setActiveTooltip(index);
//                     speakText(item.description);
//                   }}
//                 >
//                   <div className="icon-container" style={{ transform: `rotate(-${rotate}deg)` }}>
//                     {item.icon}
//                     <div
//                       ref={tooltipRef}
//                       className={`tooltip ${activeTooltip === index ? 'visible' : 'hidden'}`}
//                     >
//                       {item.description}
//                       <div
//                         className="close"
//                         onClick={(e) => {
//                           e.stopPropagation();
//                           setActiveTooltip(null);
//                         }}
//                       >
//                         Close
//                       </div>
//                     </div>
//                   </div>
//                   <h3 className="title" style={{ transform: `rotate(-${rotate}deg)` }}>{item.title}</h3>
//                   <a href="#" className="learn-more" style={{ transform: `rotate(-${rotate}deg)` }}>
//                     Learn More →
//                   </a>
//                 </div>
//               );
//             })}
//             <div className="center-text">
//               <div className="start-here">Start Here</div>
//               <div className="your-journey">Your Learning Journey</div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <style>
//         {`
//           .learning-path-section {
//             background: linear-gradient(to right, #f8fafc, #e2e8f0);
//             padding: 5rem 0;
//           }
//           .container {
//             max-width: 1280px;
//             margin: 0 auto;
//             padding: 0 1rem;
//           }
//           .header {
//             text-align: center;
//             margin-bottom: 4rem;
//           }
//           .header h2 {
//             font-size: 2.5rem;
//             font-weight: bold;
//             color: #4a5568;
//             margin-bottom: 1rem;
//           }
//           .header p {
//             color: #718096;
//             font-size: 1.125rem;
//           }
//           .circle-container {
//             position: relative;
//             display: flex;
//             justify-content: center;
//             align-items: center;
//             overflow: hidden;
//           }
//           .spin-container {
//             position: relative;
//             width: 420px;
//             height: 420px;
//             border: 4px dashed #4c51bf;
//             border-radius: 50%;
//             animation: spin-slow 30s linear infinite;
//           }
//           .spin-container.paused {
//             animation-play-state: paused;
//           }
//           .card {
//             position: absolute;
//             width: 150px;
//             text-align: center;
//             background: white;
//             border-radius: 0.5rem;
//             box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//             padding: 1rem;
//             transition: transform 0.2s;
//             opacity: 0;
//             animation: fade-in 1s ease forwards;
//           }
//           .icon-container {
//             position: relative;
//           }
//           .tooltip {
//             position: absolute;
//             z-index: 10;
//             left: 50%;
//             transform: translateX(-50%);
//             top: 1.5rem;
//             width: 200px;
//             background: white;
//             color: #4a5568;
//             font-size: 0.875rem;
//             padding: 0.75rem;
//             border-radius: 0.5rem;
//             box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//             transition: opacity 0.3s ease;
//           }
//           .tooltip.hidden {
//             opacity: 0;
//             visibility: hidden;
//           }
//           .tooltip.visible {
//             opacity: 1;
//             visibility: visible;
//           }
//           .close {
//             margin-top: 0.5rem;
//             text-align: right;
//             color: #4c51bf;
//             font-size: 0.875rem;
//             cursor: pointer;
//             text-decoration: underline;
//           }
//           .title {
//             font-size: 1rem;
//             font-weight: 600;
//             color: #4a5568;
//             margin: 0.5rem 0;
//           }
//           .learn-more {
//             font-size: 0.875rem;
//             color: #4c51bf;
//             text-decoration: underline;
//           }
//           .center-text {
//             position: absolute;
//             top: 50%;
//             left: 50%;
//             transform: translate(-50%, -50%);
//             text-align: center;
//           }
//           .start-here {
//             font-size: 1.25rem;
//             font-weight: 600;
//             color: #4c51bf;
//           }
//           .your-journey {
//             font-size: 0.875rem;
//             color: #a0aec0;
//           }
//           @keyframes spin-slow {
//             0% { transform: rotate(0deg); }
//             100% { transform: rotate(360deg); }
//           }
//           @keyframes fade-in {
//             0% { opacity: 0; transform: scale(0.8); }
//             100% { opacity: 1; transform: scale(1); }
//           }
//         `}
//       </style>
//     </section>
//   );
// };

// export default LearningPathSection;
import React from 'react';
import { FaVideo, FaCheckCircle, FaBook, FaFileAlt, FaPlusCircle } from 'react-icons/fa';

const LearningStructure = () => {
  const items = [
    {
      title: 'Training Videos',
      description: 'High-quality instructional videos covering all course concepts and practical applications.',
      icon: <FaVideo size={32} />,
      color: 'red',
    },
    {
      title: 'Practice Quizzes',
      description: 'Test your knowledge with interactive quizzes and get instant feedback on your answers.',
      icon: <FaCheckCircle size={32} />,
      color: 'green',
    },
    {
      title: 'Study Material',
      description: 'Downloadable resources including eBooks, case studies, templates and cheat sheets.',
      icon: <FaBook size={32} />,
      color: 'red',
    },
    {
      title: 'Final Assessment',
      description: 'Comprehensive exam that must be passed to receive your course certification for boost your skills.',
      icon: <FaFileAlt size={32} />,
      color: 'green',
    },
  ];

  return (
    <section className="learning-section">
      <div className="learning-header">
        <h2>Course Structure</h2>
        <p>Each course follows this comprehensive learning path.</p>
      </div>
      <div className="learning-grid">
        {items.map((item, index) => (
          <div
            key={index}
            className={`learning-card ${item.color === 'red' ? 'from-bottom' : 'from-top'}`}
          >
            <div className={`card-header ${item.color}`}>
              {item.title}
            </div>
            <div className="card-body">
              <div className="icon">{item.icon}</div>
              <p>{item.description}</p>
              <FaPlusCircle className="plus-icon" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default LearningStructure;


