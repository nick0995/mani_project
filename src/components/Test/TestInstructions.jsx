import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const TestInstructions = () => {
  const [language, setLanguage] = useState('en');
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();
  const { category } = useParams();

  const translations = {
    en: {
      title: `Online ${category?.toUpperCase()} Training Test`,
      demoTitle: 'DEMO ONLINE TEST',
      instructionTitle: 'Instruction for Online Test',
      instructionNote: 'Please read the Instructions carefully before starting the test.',
      languageLabel: 'Choose your default language:',
      agreeLabel: 'I have read and understood the instructions given above.',
      startBtn: 'Start Test',
      steps: [
        'Click start test on bottom of your screen to begin the test.',
        'The clock has been set at server and count down timer at the top right side of the screen will display the remaining time.',
        'Click one of the answers. Simply click the desired option button.',
        'Candidate can change their response at any time during the test.',
        'Click on Next to save the answer and move to the next question.',
        'Click on Mark for Review to review the answer later.',
        'To select a question, click on the question number.',
        'The colour code diagram:',
        'You can shuffle between questions anytime.',
        'Do not click final SUBMIT until you\'ve completed the exam.',
        'Score obtained will be displayed immediately after the test.'
      ],
      legend: {
        red: 'Red - Not answered',
        green: 'Green - Answered',
        yellow: 'Yellow - Not answered & Marked',
        violet: 'Violet - Answered & Marked',
        gray: 'Gray - Dumped',
        white: 'White - Not Visited'
      }
    },
    pa: {
      title: `ਓਨਲਾਈਨ ${category?.toUpperCase()} ਸਿਖਲਾਈ ਟੈਸਟ`,
      demoTitle: 'ਡੈਮੋ ਓਨਲਾਈਨ ਟੈਸਟ',
      instructionTitle: 'ਓਨਲਾਈਨ ਟੈਸਟ ਲਈ ਹਿਦਾਇਤਾਂ',
      instructionNote: 'ਕਿਰਪਾ ਕਰਕੇ ਟੈਸਟ ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਸਾਰੇ ਹੁਕਮ ਪੜ੍ਹੋ।',
      languageLabel: 'ਆਪਣੀ ਡਿਫਾਲਟ ਭਾਸ਼ਾ ਚੁਣੋ:',
      agreeLabel: 'ਮੈਂ ਉਪਰੋਕਤ ਹੁਕਮ ਪੜ੍ਹ ਲਏ ਹਨ ਅਤੇ ਉਹਨਾਂ ਨੂੰ ਸਮਝ ਲਿਆ ਹੈ।',
      startBtn: 'ਟੈਸਟ ਸ਼ੁਰੂ ਕਰੋ',
      steps: [
        'ਟੈਸਟ ਸ਼ੁਰੂ ਕਰਨ ਲਈ ਸਕਰੀਨ ਦੇ ਹੇਠਾਂ ਦਿੱਤੇ ਬਟਨ \'Start Test\' \'ਤੇ ਕਲਿੱਕ ਕਰੋ।',
        'ਟਾਈਮਰ ਸਰਵਰ ਵੱਲੋਂ ਸੈੱਟ ਕੀਤਾ ਗਿਆ ਹੈ ਅਤੇ ਸਕਰੀਨ ਦੇ ਉਪਰਲੇ ਸੱਜੇ ਪਾਸੇ ਦਿਖਾਈ ਦੇ ਰਿਹਾ ਹੈ।',
        'ਇੱਕ ਜਵਾਬ ਚੁਣਨ ਲਈ ਉਚਿਤ ਵਿਕਲਪ ਬਟਨ \'ਤੇ ਕਲਿੱਕ ਕਰੋ।',
        'ਉਮੀਦਵਾਰ ਕਿਸੇ ਵੀ ਸਮੇਂ ਆਪਣਾ ਜਵਾਬ ਬਦਲ ਸਕਦਾ ਹੈ।',
        'ਜਵਾਬ ਨੂੰ ਸੰਭਾਲਣ ਅਤੇ ਅਗਲੇ ਪ੍ਰਸ਼ਨ \'ਤੇ ਜਾਣ ਲਈ \'Next\' \'ਤੇ ਕਲਿੱਕ ਕਰੋ।',
        '\'Mark for Review\' \'ਤੇ ਕਲਿੱਕ ਕਰਕੇ ਬਾਅਦ ਵਿੱਚ ਸਮੀਖਿਆ ਕਰੋ।',
        'ਕਿਸੇ ਪ੍ਰਸ਼ਨ ਨੂੰ ਚੁਣਨ ਲਈ ਨੰਬਰ \'ਤੇ ਕਲਿੱਕ ਕਰੋ।',
        'ਰੰਗ ਕੋਡ ਡਾਇਗ੍ਰਾਮ:',
        'ਤੁਸੀਂ ਕਿਸੇ ਵੀ ਸਮੇਂ ਪ੍ਰਸ਼ਨਾਂ ਵਿੱਚ ਅਦਲ-ਬਦਲ ਕਰ ਸਕਦੇ ਹੋ।',
        '\'Submit\' ਬਟਨ ਨਾ ਦੱਬੋ ਜਦੋਂ ਤੱਕ ਤੁਸੀਂ ਟੈਸਟ ਪੂਰਾ ਨਹੀਂ ਕਰ ਲੈਂਦੇ।',
        'ਸਕੋਰ ਤੁਰੰਤ ਟੈਸਟ ਖਤਮ ਹੋਣ \'ਤੇ ਦਿਖਾਇਆ ਜਾਵੇਗਾ।'
      ],
      legend: {
        red: 'ਲਾਲ - ਜਵਾਬ ਨਹੀਂ ਦਿੱਤਾ',
        green: 'ਹਰਾ - ਜਵਾਬ ਦਿੱਤਾ',
        yellow: 'ਪੀਲਾ - ਜਵਾਬ ਨਹੀਂ ਦਿੱਤਾ ਅਤੇ ਸਮੀਖਿਆ ਲਈ ਚੁਣਿਆ',
        violet: 'ਵਾਇਲਟ - ਜਵਾਬ ਦਿੱਤਾ ਅਤੇ ਸਮੀਖਿਆ ਲਈ ਚੁਣਿਆ',
        gray: 'ਸਲੇਟੀ - ਰੱਦ ਕੀਤਾ',
        white: 'ਚਿੱਟਾ - ਨਹੀਂ ਦੇਖਿਆ ਗਿਆ'
      }
    }
  };

  const t = translations[language];

  const handleStartTest = () => {
    if (!agreed) {
      alert(language === 'pa' ? 'ਕਿਰਪਾ ਕਰਕੇ ਟੈਸਟ ਸ਼ੁਰੂ ਕਰਨ ਤੋਂ ਪਹਿਲਾਂ ਸਹਿਮਤ ਹੋਵੋ।' : 'Please agree to the instructions before starting.');
      return;
    }
    navigate(`/test/${category}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">
          {t.title}
        </h2>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 relative">
          <button
            onClick={() => setLanguage(language === 'en' ? 'pa' : 'en')}
            className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition-colors"
          >
            {language === 'en' ? 'ਪੰਜਾਬੀ' : 'English'}
          </button>

          <div className="bg-slate-700 text-white text-center py-4 rounded-md mb-6">
            <h3 className="text-xl font-bold">{t.demoTitle}</h3>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-bold text-red-600 mb-2">{t.instructionTitle}</h4>
              <p className="text-red-600 font-medium mb-4">{t.instructionNote}</p>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              <div className="bg-red-500 text-white px-3 py-2 rounded text-sm text-center">
                {t.legend.red}
              </div>
              <div className="bg-green-500 text-white px-3 py-2 rounded text-sm text-center">
                {t.legend.green}
              </div>
              <div className="bg-yellow-400 text-black px-3 py-2 rounded text-sm text-center">
                {t.legend.yellow}
              </div>
              <div className="bg-violet-500 text-white px-3 py-2 rounded text-sm text-center">
                {t.legend.violet}
              </div>
              <div className="bg-gray-500 text-white px-3 py-2 rounded text-sm text-center">
                {t.legend.gray}
              </div>
              <div className="bg-white text-black border border-gray-300 px-3 py-2 rounded text-sm text-center">
                {t.legend.white}
              </div>
            </div>

            {/* Instructions */}
            <div>
              <ol className="list-decimal list-inside space-y-2 text-gray-700 pl-4">
                {t.steps.map((step, index) => (
                  <li key={index} className="leading-relaxed">
                    {step}
                  </li>
                ))}
              </ol>
            </div>

            {/* Language Selection */}
            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t.languageLabel}
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="en">English</option>
                <option value="pa">Punjabi</option>
              </select>
            </div>

            {/* Agreement */}
            <div className="flex items-center space-x-3 mt-6">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <label htmlFor="agree" className="text-sm text-gray-700 cursor-pointer">
                {t.agreeLabel}
              </label>
            </div>

            {/* Start Button */}
            <div className="text-center mt-8">
              <button
                onClick={handleStartTest}
                className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={!agreed}
              >
                {t.startBtn}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInstructions;