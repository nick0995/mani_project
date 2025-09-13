

import React, { useState, useEffect } from 'react';


const features = [
  {
    angle: '0deg',
    title: 'Certificates',
    description: 'Obtain certificates that hold value within the department.',
    icon: '/assets/certificates-education-learning-medal-school-study-svgrepo-com.svg',
  },
  {
    angle: '60deg',
    title: 'Expert Instructors',
    description: 'Receive education from skilled professionals with a wealth of practical experience.',
    icon: '/assets/events.svg',
  },
  {
    angle: '120deg',
    title: 'Networking',
    description: 'Connect with peers and build your professional network.',
    icon: '/assets/Network.svg',
  },
  {
    angle: '180deg',
    title: 'Discuss Hub',
    description: 'Share, suggest, post your ideas and knowledge at the community.',
    icon: '/assets/Discuss.svg',
  },
  {
    angle: '240deg',
    title: 'Career Support',
    description: 'Enhanced understanding and abilities for you following course completion.',
    icon: '/assets/Careers.svg',
  },
  {
    angle: '300deg',
    title: 'Competencies',
    description: 'Gain the necessary skills to grow in your role.',
    icon: '/assets/Competencies.svg',
  },
];

const FeaturesSection = () => {
  const [activeIndex, setActiveIndex] = useState(3);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="features-section">
       <div className="section-title">
        <h2>We Provide</h2>
        <p> Comprehensive training solutions for officers.</p>
        </div>
      <div className="features-container">
       
        {/* Circular Layout */}
        <div className="circle-layout">
          <div className="circle ring ring1"></div>
          <div className="circle ring ring2"></div>
          <div className="circle center">
            <img
              src="/assets/PUNJAB POLICE LOGO PNG.png"
              alt="Center"
              className="center-image"
            />
          </div>

          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-icon"
              style={{
                transform: `rotate(${feature.angle}) translate(130px) rotate(-${feature.angle})`,
              }}
              onClick={() => setActiveIndex(index)}
            >
              <img
                src={feature.icon}
                alt={feature.title}
                className={`icon-image ${activeIndex === index ? 'active' : ''}`}
              />
            </div>
          ))}
        </div>

        {/* Info Panel */}
        <div className="info-panel">
          <p className="info-desc">{features[activeIndex].description}</p>
          <h4 className="info-title">{features[activeIndex].title}</h4>
          <img
            src={features[activeIndex].icon}
            alt="Info Icon"
            className="info-icon"
          />
          <div className="dots">
            {features.map((_, idx) => (
              <div
                key={idx}
                className={`dot ${idx === activeIndex ? 'active' : ''}`}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
