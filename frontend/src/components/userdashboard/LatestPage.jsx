import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LatestPage.css";

const LatestPage = () => {
  const [activeTab, setActiveTab] = useState("notices");

   // ========= Sample Data =========
  const upcomingApps = [
    {
      id: 1,
      title: "PRISMA Portal",
      description: "Next-gen dashboard for analytics with AI-powered insights and predictive modeling capabilities.",
      date: "2023-12-15",
      image: "/images/prisma2.jpeg",
      color: "#6366F1",
    },
    {
      id: 2,
      title: "eSakshya",
      description: "Platform for process recording of various events for the implementation of new criminal laws across country.",
      date: "2024-01-10",
      image: "/images/esakshya.png",
      color: "#F59E0B",
    },
    {
      id: 3,
      title: "eSign",
      description: "Digital signature platform for Punjab Police services, including Public Grievance system.",
      date: "2024-02-20",
      image: "/images/esign2.png",
      color: "#10B981",
    },
  ];

  const testingApps = [
    {
      id: 4,
      title: "Prisma Portal",
      description: "AI-powered financial analysis tool for personal and business finance management.",
      date: "2023-11-30",
      image: "/images/prisma2.jpeg",
      color: "#3B82F6",
    },
    {
      id: 5,
      title: "eSign Beta",
      description: "Next generation digital signature platform with enhanced security features.",
      date: "2023-12-05",
      image: "/images/esign.png",
      color: "#8B5CF6",
    },
  ];

  const currentNotices = [
    { id: 101, title: "Q4 Product Roadmap", description: "Developers must attend roadmap review.", date: "2023-11-15", icon: "📅" },
    { id: 102, title: "Security Updates", description: "Complete training module by Nov 30.", date: "2023-11-10", icon: "🔒" },
    { id: 103, title: "Beta Testing Guide", description: "Updated guidelines available.", date: "2023-11-05", icon: "📋" },
  ];

  const manuals = [
    { id: 201, title: "CCTNS Manual", description: "Comprehensive guide to CCTNS.", date: "2023-09-10", icon: "📘" },
    { id: 202, title: "ICJS Manual", description: "Reference manual for ICJS platform.", date: "2023-09-20", icon: "📖" },
    { id: 203, title: "Cybersecurity Handbook", description: "Secure policing online.", date: "2023-10-05", icon: "🔐" },
  ];

  const archives = [
    { id: 301, title: "2022 Annual Report", description: "Performance report of 2022.", date: "2022-12-31", icon: "📊" },
    { id: 302, title: "Old Training Schedule", description: "Archived training events.", date: "2022-08-15", icon: "🗂️" },
    { id: 303, title: "Previous Security Guidelines", description: "Outdated but useful reference.", date: "2021-05-22", icon: "📑" },
  ];

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  const renderTickerCards = (items) =>
    items.concat(items).map((item, index) => (
      <div className="notice-card" key={index}>
        <div className="notice-icon">{item.icon}</div>
        <div className="notice-content">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <span className="notice-date">{item.date}</span>
        </div>
      </div>
    ));

  return (
    <div className="modern-container">
      <header className="modern-header">
        <h1>Latest Updates</h1>
      </header>

      <main className="modern-main">
        <div className="tabs-container">
          <div
            className={`tab ${activeTab === "notices" ? "active" : ""}`}
            onClick={() => setActiveTab("notices")}
          >
            Notices
          </div>
          <div
            className={`tab ${activeTab === "manuals" ? "active" : ""}`}
            onClick={() => setActiveTab("manuals")}
          >
            Manuals
          </div>
          <div
            className={`tab ${activeTab === "archives" ? "active" : ""}`}
            onClick={() => setActiveTab("archives")}
          >
            Archives
          </div>
        </div>

        {/* Vertical Ticker Sections */}
        {activeTab === "notices" && (
          <section className="modern-section vertical-ticker">
            <h2>Notices</h2>
            <div className="ticker-wrapper">{renderTickerCards(currentNotices)}</div>
          </section>
        )}

        {activeTab === "manuals" && (
          <section className="modern-section vertical-ticker">
            <h2>Manuals</h2>
            <div className="ticker-wrapper">{renderTickerCards(manuals)}</div>
          </section>
        )}

        {activeTab === "archives" && (
          <section className="modern-section vertical-ticker">
            <h2>Archives</h2>
            <div className="ticker-wrapper">{renderTickerCards(archives)}</div>
          </section>
        )}

        {/* Upcoming Releases */}
        <section className="modern-section carousel-section">
          <h2>Upcoming Releases</h2>
          <Slider {...carouselSettings}>
            {upcomingApps.map((app) => (
              <div className="app-card" key={app.id} style={{ borderTopColor: app.color }}>
                <div className="app-image">
                  <img src={app.image} alt={app.title} />
                </div>
                <div className="app-details">
                  <h3>{app.title}</h3>
                  <p>{app.description}</p>
                  <div className="app-meta">
                    <span className="release-date">Release: {app.date}</span>
                    <span className="status-badge upcoming">Upcoming</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>

        {/* Currently in Testing */}
        <section className="modern-section carousel-section">
          <h2>Currently in Testing</h2>
          <Slider {...carouselSettings}>
            {testingApps.map((app) => (
              <div className="app-card" key={app.id} style={{ borderTopColor: app.color }}>
                <div className="app-image">
                  <img src={app.image} alt={app.title} />
                </div>
                <div className="app-details">
                  <h3>{app.title}</h3>
                  <p>{app.description}</p>
                  <div className="app-meta">
                    <span className="release-date">Testing Until: {app.date}</span>
                    <span className="status-badge testing">Testing</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </section>
      </main>
    </div>
  );
};

export default LatestPage;
