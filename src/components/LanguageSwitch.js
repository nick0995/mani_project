import React, { useState } from 'react';

const LanguageSwitch = () => {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'pa' : 'en'));
  };

  return (
    <div className="btn btn-outline-primary ms-3">
      <div
        onClick={toggleLanguage}
        className={`w-32 h-10 flex items-center rounded-full p-1 cursor-pointer transition duration-300 ${
          language === 'en' ? 'bg-blue-600' : 'bg-green-600'
        }`}
      >
        <div
          className={`w-1/2 h-full bg-white text-sm font-medium text-center flex items-center justify-center rounded-full shadow-md transition-transform duration-300 ${
            language === 'en' ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {language === 'en' ? 'English' : 'ਪੰਜਾਬੀ'}
        </div>
      </div>
    </div>
  );
};

export default LanguageSwitch;
