import React from "react";
import "./EmergencySidebar.css";

const services = [
  {
    title: "Women Power Line",
    frontImg: "images/women.png",
    backImg: "images/women2.png",
    link: "http://www.wcso.in/",
  },
  {
    title: "UP 112 Control Room",
    frontImg: "images/112.jpg",
    backImg: "images/1122.png",
    link: "http://112.up.gov.in",
  },
  {
    title: "Cyber Crime",
    frontImg: "images/cyber1.jpg",
    backImg: "images/cyber-left.jpg",
    link: "https://cybercrime.gov.in/",
  },
  {
    title: "Fire Brigade",
    frontImg: "images/fire1.jpg",
    backImg: "images/4.jpg",
    link: "https://upfireservice.gov.in/",
  },
  {
    title: "Ambulance",
    frontImg: "images/ambua.png",
    backImg: "images/3.jpg",
  },
  {
    title: "Child Helpline",
    frontImg: "images/child1.jpg",
    backImg: "images/child-5.jpg",
  },
];

const EmergencySidebar = () => {
  return (
    <div className="sidebar">
      {services.map((service, idx) => (
        <div className="flip-card" key={idx}>
          <div className="flip-card-inner">
            <div className="flip-card-front">
              <img src={service.frontImg} alt={service.title} />
            </div>
            <div className="flip-card-back">
              {service.link ? (
                <a href={service.link} target="_blank" rel="noopener noreferrer">
                  <img src={service.backImg} alt={service.title} />
                </a>
              ) : (
                <img src={service.backImg} alt={service.title} />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmergencySidebar;
