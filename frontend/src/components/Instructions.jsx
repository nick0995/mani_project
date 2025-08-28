// import React, { useState } from 'react';

// const translations = {
//   "main-title": {
//     en: "Online Examination System",
//     pa: "ਆਨਲਾਈਨ ਪ੍ਰੀਖਿਆ ਪ੍ਰਣਾਲੀ"
//   },
//   "demo-title": {
//     en: "ONLINE TEST",
//     pa: "ਡੈਮੋ ਆਨਲਾਈਨ ਟੈਸਟ"
//   },
//   "instruction-title": {
//     en: "Instruction for Online Test",
//     pa: "ਆਨਲਾਈਨ ਟੈਸਟ ਲਈ ਹੁਕਮ"
//   },
//   "instruction-note": {
//     en: "Please read the Instructions carefully before starting the test.",
//     pa: "ਕਿਰਪਾ ਕਰਕੇ ਟੈਸਟ ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਸਾਰੇ ਹੁਕਮ ਪੜ੍ਹੋ।"
//   },
//   "language-label": {
//     en: "Choose your default language:",
//     pa: "ਆਪਣੀ ਡਿਫਾਲਟ ਭਾਸ਼ਾ ਚੁਣੋ:"
//   },
//   "agree-label": {
//     en: "I have read and understood the instructions given above.",
//     pa: "ਮੈਂ ਉਪਰੋਕਤ ਹੁਕਮ ਪੜ੍ਹ ਲਏ ਹਨ ਅਤੇ ਉਹਨਾਂ ਨੂੰ ਸਮਝ ਲਿਆ ਹੈ।"
//   },
//   "start-btn": {
//     en: "Start Test",
//     pa: "ਟੈਸਟ ਸ਼ੁਰੂ ਕਰੋ"
//   },
//   "legend-red": {
//     en: "Red - Not answered",
//     pa: "ਲਾਲ - ਜਵਾਬ ਨਹੀਂ ਦਿੱਤਾ"
//   },
//   "legend-green": {
//     en: "Green - Answered",
//     pa: "ਹਰਾ - ਜਵਾਬ ਦਿੱਤਾ"
//   },
//   "legend-yellow": {
//     en: "Yellow - Not answered & Marked",
//     pa: "ਪੀਲਾ - ਜਵਾਬ ਨਹੀਂ ਦਿੱਤਾ ਅਤੇ ਸਮੀਖਿਆ ਲਈ ਚੁਣਿਆ"
//   },
//   "legend-violet": {
//     en: "Violet - Answered & Marked",
//     pa: "ਵਾਇਲਟ - ਜਵਾਬ ਦਿੱਤਾ ਅਤੇ ਸਮੀਖਿਆ ਲਈ ਚੁਣਿਆ"
//   },
//   "legend-gray": {
//     en: "Gray - Dumped",
//     pa: "ਸਲੇਟੀ - ਰੱਦ ਕੀਤਾ"
//   },
//   "legend-white": {
//     en: "White - Not Visited",
//     pa: "ਚਿੱਟਾ - ਨਹੀਂ ਦੇਖਿਆ ਗਿਆ"
//   },
//   "steps": {
//     en: [
//       "Click start test on bottom of your screen to begin the test.",
//       "The clock has been set at server and count down timer at the top right side of the screen...",
//       "Click one of the answers. Simply click the desired option button.",
//       "Candidate can change their response at any time...",
//       "Click on Next to save the answer and move to the next question.",
//       "Click on Mark for Review to review the answer later.",
//       "To select a question, click on the question number.",
//       "The colour code diagram:",
//       "You can shuffle between questions anytime.",
//       "Do not click final SUBMIT until you've completed the exam.",
//       "Score obtained will be displayed immediately after the test."
//     ],
//     pa: [
//       "ਟੈਸਟ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਸਕਰੀਨ ਦੇ ਹੇਠਾਂ ਦਿੱਤੇ ਬਟਨ 'Start Test' 'ਤੇ ਕਲਿੱਕ ਕਰੋ।",
//       "ਟਾਈਮਰ ਸਰਵਰ ਵੱਲੋਂ ਸੈੱਟ ਕੀਤਾ ਗਿਆ ਹੈ ਅਤੇ ਸਕਰੀਨ ਦੇ ਉਪਰਲੇ ਸੱਜੇ ਪਾਸੇ ਦਿਖਾਈ ਦੇ ਰਿਹਾ ਹੈ।",
//       "ਇੱਕ ਜਵਾਬ ਚੁਣਨ ਲਈ ਉਚਿਤ ਵਿਕਲਪ ਬਟਨ 'ਤੇ ਕਲਿੱਕ ਕਰੋ।",
//       "ਉਮੀਦਵਾਰ ਕਿਸੇ ਵੀ ਸਮੇਂ ਆਪਣਾ ਜਵਾਬ ਬਦਲ ਸਕਦਾ ਹੈ।",
//       "ਜਵਾਬ ਨੂੰ ਸੰਭਾਲਣ ਅਤੇ ਅਗਲੇ ਪ੍ਰਸ਼ਨ 'ਤੇ ਜਾਣ ਲਈ 'Next' 'ਤੇ ਕਲਿੱਕ ਕਰੋ।",
//       "'Mark for Review' 'ਤੇ ਕਲਿੱਕ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਸਮੀਖਿਆ ਕਰੋ।",
//       "ਕਿਸੇ ਪ੍ਰਸ਼ਨ ਨੂੰ ਚੁਣਨ ਲਈ ਨੰਬਰ 'ਤੇ ਕਲਿੱਕ ਕਰੋ।",
//       "ਰੰਗ ਕੋਡ ਡਾਇਗ੍ਰਾਮ:",
//       "ਤੁਸੀਂ ਕਿਸੇ ਵੀ ਸਮੇਂ ਪ੍ਰਸ਼ਨਾਂ ਵਿੱਚ ਅਦਲ-ਬਦਲ ਕਰ ਸਕਦੇ ਹੋ।",
//       "'Submit' ਬਟਨ ਨਾ ਦੱਬੋ ਜਦੋਂ ਤੱਕ ਤੁਸੀਂ ਟੈਸਟ ਪੂਰਾ ਨਹੀਂ ਕਰ ਲੈਂਦੇ।",
//       "ਸਕੋਰ ਤੁਰੰਤ ਟੈਸਟ ਖਤਮ ਹੋਣ 'ਤੇ ਦਿਖਾਇਆ ਜਾਵੇਗਾ।"
//     ]
//   }
// };

// const Instructions = () => {
//   const [language, setLanguage] = useState("en");
//   const [agreed, setAgreed] = useState(false);

//   const t = (key) => {
//     const value = translations[key];
//     if (!value) return key;
//     if (typeof value === "object" && value.en && value.pa) {
//       return value[language];
//     }
//     return value;
//   };

//   const toggleLanguage = () => {
//     setLanguage((prev) => (prev === "en" ? "pa" : "en"));
//   };

//   const startTest = () => {
//     if (!agreed) {
//       alert(language === "pa"
//         ? "ਕਿਰਪਾ ਕਰਕੇ ਟੈਸਟ ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਸਹਿਮਤ ਹੋਵੋ।"
//         : "Please agree to the instructions before starting.");
//       return;
//     }
//     window.location.href = "/test";
//   };

//   return (
//     <div style={styles.page}>
//       <h2>{t("main-title")}</h2>
//       <div style={styles.container}>
//         <button style={styles.translateBtn} onClick={toggleLanguage}>Translate</button>
//         <div style={styles.header}>{t("demo-title")}</div>

//         <div style={styles.instructions}>
//           <p><strong>{t("instruction-title")}</strong></p>
//           <p>{t("instruction-note")}</p>

//           <div style={styles.legend}>
//             <div style={{ ...styles.legendBox, background: '#e74c3c' }}>{t("legend-red")}</div>
//             <div style={{ ...styles.legendBox, background: '#27ae60' }}>{t("legend-green")}</div>
//             <div style={{ ...styles.legendBox, background: '#f1c40f', color: '#000' }}>{t("legend-yellow")}</div>
//             <div style={{ ...styles.legendBox, background: '#8e44ad' }}>{t("legend-violet")}</div>
//             <div style={{ ...styles.legendBox, background: '#7f8c8d' }}>{t("legend-gray")}</div>
//             <div style={{ ...styles.legendBox, background: '#ecf0f1', color: '#000', border: '1px solid #bdc3c7' }}>{t("legend-white")}</div>
//           </div>

//           <ol>
//             {t("steps").map((step, index) => (
//               <li key={index}>{step}</li>
//             ))}
//           </ol>
//         </div>

//         <div style={styles.footer}>
//           <label htmlFor="lang">{t("language-label")}</label>
//           <select id="lang" onChange={(e) => setLanguage(e.target.value)} value={language}>
//             <option value="en">English</option>
//             <option value="pa">Punjabi</option>
//           </select>
//           <br /><br />
//           <input type="checkbox" id="agree" onChange={(e) => setAgreed(e.target.checked)} />
//           <label htmlFor="agree">{t("agree-label")}</label>
//         </div>

//         <button style={styles.startTest} onClick={startTest}>{t("start-btn")}</button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   page: {
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     backgroundColor: '#f4f6fa',
//     margin: 0,
//     padding: 0
//   },
//   container: {
//     maxWidth: '800px',
//     margin: '20px auto',
//     background: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//     padding: '30px',
//     position: 'relative'
//   },
//   translateBtn: {
//     position: 'absolute',
//     top: '15px',
//     right: '20px',
//     backgroundColor: '#e67e22',
//     color: 'white',
//     border: 'none',
//     padding: '6px 12px',
//     borderRadius: '4px',
//     fontSize: '14px',
//     cursor: 'pointer'
//   },
//   header: {
//     backgroundColor: '#003366',
//     color: '#ffffff',
//     fontWeight: 'bold',
//     padding: '15px',
//     textAlign: 'center',
//     fontSize: '20px',
//     borderRadius: '5px',
//     marginBottom: '20px'
//   },
//   instructions: {
//     textAlign: 'left',
//     fontSize: '15px',
//     lineHeight: 1.7
//   },
//   legend: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '10px',
//     margin: '10px 0'
//   },
//   legendBox: {
//     padding: '8px 12px',
//     borderRadius: '5px',
//     fontSize: '14px',
//     color: 'white',
//     minWidth: '150px',
//     textAlign: 'center'
//   },
//   footer: {
//     marginTop: '30px',
//     fontSize: '15px'
//   },
//   startTest: {
//     marginTop: '30px',
//     padding: '12px 30px',
//     fontSize: '16px',
//     backgroundColor: '#007acc',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer'
//   }
// };

// export default Instructions;
// import React, { useEffect, useState } from 'react';
// import FocusWarningOverlay from './FocusWarningOverlay'; // ⬅️ Make sure this file exists

// const translations = {
//   "main-title": {
//     en: "Online Examination System",
//     pa: "ਆਨਲਾਈਨ ਪ੍ਰੀਖਿਆ ਪ੍ਰਣਾਲੀ"
//   },
//   "demo-title": {
//     en: "ONLINE TEST",
//     pa: "ਡੈਮੋ ਆਨਲਾਈਨ ਟੈਸਟ"
//   },
//   "instruction-title": {
//     en: "Instruction for Online Test",
//     pa: "ਆਨਲਾਈਨ ਟੈਸਟ ਲਈ ਹੁਕਮ"
//   },
//   "instruction-note": {
//     en: "Please read the Instructions carefully before starting the test.",
//     pa: "ਕਿਰਪਾ ਕਰਕੇ ਟੈਸਟ ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਸਾਰੇ ਹੁਕਮ ਪੜ੍ਹੋ।"
//   },
//   "language-label": {
//     en: "Choose your default language:",
//     pa: "ਆਪਣੀ ਡਿਫਾਲਟ ਭਾਸ਼ਾ ਚੁਣੋ:"
//   },
//   "agree-label": {
//     en: "I have read and understood the instructions given above.",
//     pa: "ਮੈਂ ਉਪਰੋਕਤ ਹੁਕਮ ਪੜ੍ਹ ਲਏ ਹਨ ਅਤੇ ਉਹਨਾਂ ਨੂੰ ਸਮਝ ਲਿਆ ਹੈ।"
//   },
//   "start-btn": {
//     en: "Start Test",
//     pa: "ਟੈਸਟ ਸ਼ੁਰੂ ਕਰੋ"
//   },
//   "legend-red": {
//     en: "Red - Not answered",
//     pa: "ਲਾਲ - ਜਵਾਬ ਨਹੀਂ ਦਿੱਤਾ"
//   },
//   "legend-green": {
//     en: "Green - Answered",
//     pa: "ਹਰਾ - ਜਵਾਬ ਦਿੱਤਾ"
//   },
//   "legend-yellow": {
//     en: "Yellow - Not answered & Marked",
//     pa: "ਪੀਲਾ - ਜਵਾਬ ਨਹੀਂ ਦਿੱਤਾ ਅਤੇ ਸਮੀਖਿਆ ਲਈ ਚੁਣਿਆ"
//   },
//   "legend-violet": {
//     en: "Violet - Answered & Marked",
//     pa: "ਵਾਇਲਟ - ਜਵਾਬ ਦਿੱਤਾ ਅਤੇ ਸਮੀਖਿਆ ਲਈ ਚੁਣਿਆ"
//   },
//   "legend-gray": {
//     en: "Gray - Dumped",
//     pa: "ਸਲੇਟੀ - ਰੱਦ ਕੀਤਾ"
//   },
//   "legend-white": {
//     en: "White - Not Visited",
//     pa: "ਚਿੱਟਾ - ਨਹੀਂ ਦੇਖਿਆ ਗਿਆ"
//   },
//   "steps": {
//     en: [
//       "Click start test on bottom of your screen to begin the test.",
//       "The clock has been set at server and count down timer at the top right side of the screen...",
//       "Click one of the answers. Simply click the desired option button.",
//       "Candidate can change their response at any time...",
//       "Click on Next to save the answer and move to the next question.",
//       "Click on Mark for Review to review the answer later.",
//       "To select a question, click on the question number.",
//       "The colour code diagram:",
//       "You can shuffle between questions anytime.",
//       "Do not click final SUBMIT until you've completed the exam.",
//       "Score obtained will be displayed immediately after the test."
//     ],
//     pa: [
//       "ਟੈਸਟ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਸਕਰੀਨ ਦੇ ਹੇਠਾਂ ਦਿੱਤੇ ਬਟਨ 'Start Test' 'ਤੇ ਕਲਿੱਕ ਕਰੋ।",
//       "ਟਾਈਮਰ ਸਰਵਰ ਵੱਲੋਂ ਸੈੱਟ ਕੀਤਾ ਗਿਆ ਹੈ ਅਤੇ ਸਕਰੀਨ ਦੇ ਉਪਰਲੇ ਸੱਜੇ ਪਾਸੇ ਦਿਖਾਈ ਦੇ ਰਿਹਾ ਹੈ।",
//       "ਇੱਕ ਜਵਾਬ ਚੁਣਨ ਲਈ ਉਚਿਤ ਵਿਕਲਪ ਬਟਨ 'ਤੇ ਕਲਿੱਕ ਕਰੋ।",
//       "ਉਮੀਦਵਾਰ ਕਿਸੇ ਵੀ ਸਮੇਂ ਆਪਣਾ ਜਵਾਬ ਬਦਲ ਸਕਦਾ ਹੈ।",
//       "ਜਵਾਬ ਨੂੰ ਸੰਭਾਲਣ ਅਤੇ ਅਗਲੇ ਪ੍ਰਸ਼ਨ 'ਤੇ ਜਾਣ ਲਈ 'Next' 'ਤੇ ਕਲਿੱਕ ਕਰੋ।",
//       "'Mark for Review' 'ਤੇ ਕਲਿੱਕ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਸਮੀਖਿਆ ਕਰੋ।",
//       "ਕਿਸੇ ਪ੍ਰਸ਼ਨ ਨੂੰ ਚੁਣਨ ਲਈ ਨੰਬਰ 'ਤੇ ਕਲਿੱਕ ਕਰੋ।",
//       "ਰੰਗ ਕੋਡ ਡਾਇਗ੍ਰਾਮ:",
//       "ਤੁਸੀਂ ਕਿਸੇ ਵੀ ਸਮੇਂ ਪ੍ਰਸ਼ਨਾਂ ਵਿੱਚ ਅਦਲ-ਬਦਲ ਕਰ ਸਕਦੇ ਹੋ।",
//       "'Submit' ਬਟਨ ਨਾ ਦੱਬੋ ਜਦੋਂ ਤੱਕ ਤੁਸੀਂ ਟੈਸਟ ਪੂਰਾ ਨਹੀਂ ਕਰ ਲੈਂਦੇ।",
//       "ਸਕੋਰ ਤੁਰੰਤ ਟੈਸਟ ਖਤਮ ਹੋਣ 'ਤੇ ਦਿਖਾਇਆ ਜਾਵੇਗਾ।"
//     ]
//   }
// };

// const Instructions = () => {
//   const [language, setLanguage] = useState("en");
//   const [agreed, setAgreed] = useState(false);

//   const t = (key) => {
//     const value = translations[key];
//     if (!value) return key;
//     if (typeof value === "object" && value.en && value.pa) {
//       return value[language];
//     }
//     return value;
//   };

//   const toggleLanguage = () => {
//     setLanguage((prev) => (prev === "en" ? "pa" : "en"));
//   };

//   const startTest = () => {
//     if (!agreed) {
//       alert(language === "pa"
//         ? "ਕਿਰਪਾ ਕਰਕੇ ਟੈਸਟ ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਸਹਿਮਤ ਹੋਵੋ।"
//         : "Please agree to the instructions before starting.");
//       return;
//     }

//     // Exit fullscreen
//     if (document.fullscreenElement || document.webkitFullscreenElement) {
//       if (document.exitFullscreen) document.exitFullscreen();
//       else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
//     }

//     window.location.href = "/Testpage";
//   };

//   useEffect(() => {
//     // Request fullscreen
//     const requestFullScreen = () => {
//       const el = document.documentElement;
//       if (el.requestFullscreen) el.requestFullscreen();
//       else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
//       else if (el.mozRequestFullScreen) el.mozRequestFullScreen();
//       else if (el.msRequestFullscreen) el.msRequestFullscreen();
//     };

//     // Disable right-click
//     const disableRightClick = (e) => e.preventDefault();

//     // Disable common keyboard shortcuts
//     const disableShortcuts = (e) => {
//       const forbiddenKeys = [
//         'F12', 'F11', 'F5', 'Tab', 'Escape', 'PrintScreen',
//         'Control', 'Alt', 'Meta'
//       ];

//       const ctrlKeys = ['s', 'p', 'u', 'c', 'x', 'v', 'a'];

//       if (
//         forbiddenKeys.includes(e.key) ||
//         ((e.ctrlKey || e.metaKey) && ctrlKeys.includes(e.key.toLowerCase()))
//       ) {
//         e.preventDefault();
//         e.stopPropagation();
//         return false;
//       }

//       // Prevent Backspace navigation
//       if (e.key === 'Backspace' && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
//         e.preventDefault();
//       }
//     };

//     requestFullScreen();
//     document.addEventListener('contextmenu', disableRightClick);
//     document.addEventListener('keydown', disableShortcuts);

//     return () => {
//       document.removeEventListener('contextmenu', disableRightClick);
//       document.removeEventListener('keydown', disableShortcuts);
//     };
//   }, []);

//   return (
//     <div style={styles.page}>
//       <FocusWarningOverlay /> {/* ⬅️ Focus/Tab/Alt+Tab Tracker */}
//       <h2>{t("main-title")}</h2>
//       <div style={styles.container}>
//         <button style={styles.translateBtn} onClick={toggleLanguage}>Translate</button>
//         <div style={styles.header}>{t("demo-title")}</div>

//         <div style={styles.instructions}>
//           <p><strong>{t("instruction-title")}</strong></p>
//           <p>{t("instruction-note")}</p>

//           <div style={styles.legend}>
//             <div style={{ ...styles.legendBox, background: '#e74c3c' }}>{t("legend-red")}</div>
//             <div style={{ ...styles.legendBox, background: '#27ae60' }}>{t("legend-green")}</div>
//             <div style={{ ...styles.legendBox, background: '#f1c40f', color: '#000' }}>{t("legend-yellow")}</div>
//             <div style={{ ...styles.legendBox, background: '#8e44ad' }}>{t("legend-violet")}</div>
//             <div style={{ ...styles.legendBox, background: '#7f8c8d' }}>{t("legend-gray")}</div>
//             <div style={{ ...styles.legendBox, background: '#ecf0f1', color: '#000', border: '1px solid #bdc3c7' }}>{t("legend-white")}</div>
//           </div>

//           <ol>
//             {t("steps").map((step, index) => (
//               <li key={index}>{step}</li>
//             ))}
//           </ol>
//         </div>

//         <div style={styles.footer}>
//           <label htmlFor="lang">{t("language-label")}</label>
//           <select id="lang" onChange={(e) => setLanguage(e.target.value)} value={language}>
//             <option value="en">English</option>
//             <option value="pa">Punjabi</option>
//           </select>
//           <br /><br />
//           <input type="checkbox" id="agree" onChange={(e) => setAgreed(e.target.checked)} />
//           <label htmlFor="agree">{t("agree-label")}</label>
//         </div>

//         <button style={styles.startTest} onClick={startTest}>{t("start-btn")}</button>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   page: {
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     backgroundColor: '#f4f6fa',
//     margin: 0,
//     padding: 0,
//     minHeight: '100vh'
//   },
//   container: {
//     maxWidth: '800px',
//     margin: '20px auto',
//     background: '#ffffff',
//     borderRadius: '8px',
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//     padding: '30px',
//     position: 'relative'
//   },
//   translateBtn: {
//     position: 'absolute',
//     top: '15px',
//     right: '20px',
//     backgroundColor: '#e67e22',
//     color: 'white',
//     border: 'none',
//     padding: '6px 12px',
//     borderRadius: '4px',
//     fontSize: '14px',
//     cursor: 'pointer'
//   },
//   header: {
//     backgroundColor: '#003366',
//     color: '#ffffff',
//     fontWeight: 'bold',
//     padding: '15px',
//     textAlign: 'center',
//     fontSize: '20px',
//     borderRadius: '5px',
//     marginBottom: '20px'
//   },
//   instructions: {
//     textAlign: 'left',
//     fontSize: '15px',
//     lineHeight: 1.7
//   },
//   legend: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     gap: '10px',
//     margin: '10px 0'
//   },
//   legendBox: {
//     padding: '8px 12px',
//     borderRadius: '5px',
//     fontSize: '14px',
//     color: 'white',
//     minWidth: '150px',
//     textAlign: 'center'
//   },
//   footer: {
//     marginTop: '30px',
//     fontSize: '15px'
//   },
//   startTest: {
//     marginTop: '30px',
//     padding: '12px 30px',
//     fontSize: '16px',
//     backgroundColor: '#007acc',
//     color: 'white',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer'
//   }
// };

// export default Instructions;
// src/components/InstructionPage.js
import React, { useState } from 'react';

const translations = {
  en: {
    title: 'ICJS Assessment Instructions',
    subtitle: 'Please read all instructions carefully before starting the test',
    general: 'General Instructions',
    instructions: [
      'The test consists of 30 multiple choice questions',
      'Total time allotted is 60 minutes',
      'Each question carries 1 mark',
      'There is no negative marking',
      'Right-click is disabled throughout the test',
    ],
    navigation: 'Navigation Guide',
    guide: [
      'Use the question palette to navigate between questions',
      'Click Save & Next to save your answer and move to next question',
      'Use Mark for Review to flag questions for later review',
      "Click Submit when you've completed all questions",
    ],
    noteTitle: 'Important Note:',
    note: 'Do not refresh the page or click the back button once the test has started, as this may result in loss of progress.',
    start: 'Start Test Now',
    language: 'Language: English'
  },
  pa: {
    title: ' ICJS ਮੁਲਾਂਕਣ ਲਈ ਹਦਾਇਤਾਂ',
    subtitle: 'ਕਿਰਪਾ ਕਰਕੇ ਟੈਸਟ ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਸਾਰੇ ਨਿਰਦੇਸ਼ ਧਿਆਨ ਨਾਲ ਪੜ੍ਹੋ',
    general: 'ਸਧਾਰਨ ਨਿਰਦੇਸ਼',
    instructions: [
      'ਟੈਸਟ ਵਿੱਚ 30 ਬਹੁ-ਵਿਕਲਪੀ ਪ੍ਰਸ਼ਨ ਹਨ',
      'ਕੁੱਲ ਸਮਾਂ 60 ਮਿੰਟ ਹੈ',
      'ਹਰ ਪ੍ਰਸ਼ਨ 1 ਅੰਕ ਦਾ ਹੈ',
      'ਨੈਗੇਟਿਵ ਮਾਰਕਿੰਗ ਨਹੀਂ ਹੈ',
      'ਟੈਸਟ ਦੌਰਾਨ ਰਾਈਟ-ਕਲਿੱਕ ਅਸਮਰਥਿਤ ਹੈ',
    ],
    navigation: 'ਨੇਵੀਗੇਸ਼ਨ ਗਾਈਡ',
    guide: [
      'ਪ੍ਰਸ਼ਨਾਂ ਵਿਚਕਾਰ ਜਾਣ ਲਈ ਕਵੈਸ਼ਚਨ ਪੈਲਟ ਵਰਤੋਂ',
      'ਆਪਣਾ ਜਵਾਬ ਸੰਭਾਲਣ ਅਤੇ ਅਗਲੇ ਪ੍ਰਸ਼ਨ ਉੱਤੇ ਜਾਣ ਲਈ "Save & Next" ਕਲਿੱਕ ਕਰੋ',
      '"Mark for Review" ਨਾਲ ਪ੍ਰਸ਼ਨ ਨੋਟ ਕਰ ਸਕਦੇ ਹੋ',
      'ਸਾਰੇ ਪ੍ਰਸ਼ਨਾਂ ਦੇ ਬਾਅਦ "Submit" ਤੇ ਕਲਿੱਕ ਕਰੋ',
    ],
    noteTitle: 'ਮਹੱਤਵਪੂਰਨ ਨੋਟ:',
    note: 'ਟੈਸਟ ਸ਼ੁਰੂ ਹੋਣ ਤੋਂ ਬਾਅਦ ਪੇਜ ਰੀਫ੍ਰੈਸ਼ ਜਾਂ ਬੈਕ ਬਟਨ ਨਾ ਦੱਬੋ, ਨਹੀਂ ਤਾਂ ਤੁਹਾਡਾ ਪ੍ਰਗਟ੍ਰੈਸ ਲੋਸਟ ਹੋ ਸਕਦਾ ਹੈ।',
    start: 'ਟੈਸਟ ਸ਼ੁਰੂ ਕਰੋ',
    language: 'ਭਾਸ਼ਾ: ਪੰਜਾਬੀ'
  }
};

function Instructions({ onStartTest }) {
  const [lang, setLang] = useState('en');
  const t = translations[lang];

  return (
    <div id="instructionPage" className="instruction-container">
      {/* Language Switch */}
      <div className="flex justify-end p-4">
        <div
          onClick={() => setLang(lang === 'en' ? 'pa' : 'en')}
          className={`w-32 h-10 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ${
            lang === 'en' ? 'bg-blue-600' : 'bg-green-600'
          }`}
        >
          <div
            className={`w-1/2 h-full bg-white text-sm font-medium text-center flex items-center justify-center rounded-full shadow-md transition-transform duration-300 ${
              lang === 'en' ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            {lang === 'en' ? 'English' : 'ਪੰਜਾਬੀ'}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center mb-8">
        <h1 className="instruction-header">{t.title}</h1>
        <p className="instruction-subtitle">{t.subtitle}</p>
      </div>

      <div className="instruction-grid">
        <div className="instruction-card">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">{t.general}</h2>
          <ul className="instruction-list">
            {t.instructions.map((item, i) => (
              <li key={i} className="instruction-list-item">
                <span className="instruction-list-icon">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="instruction-card">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">{t.navigation}</h2>
          <ul className="instruction-list">
            {t.guide.map((step, i) => (
              <li key={i} className="instruction-list-item">
                <span className={`nav-guide-icon ${['blue', 'green', 'yellow', 'blue'][i]}`}>{i + 1}</span>
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-col items-center mt-8">
        <div className="important-note-container">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">{t.noteTitle}</h3>
          <p className="text-gray-700">{t.note}</p>
        </div>

        <button onClick={onStartTest} className="btn btn-outline-primary mt-4">
          {t.start}
        </button>
      </div>
    </div>
  );
}

export default Instructions;
