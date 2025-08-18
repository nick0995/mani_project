// import React, { useState } from "react";
// import "./LatestPage.css";
 
// const LatestPage = () => {
//   const [activeTab, setActiveTab] = useState("notices");
//   const [searchTerm, setSearchTerm] = useState("");
//   const [isScrollPaused, setIsScrollPaused] = useState(false);

//   // Data arrays (unchanged)
//   const upcomingApps = [
//     {
//       id: 1,
//       title: "PRISMA Portal",
//       description:
//         "Next-gen dashboard for analytics with AI-powered insights and predictive modeling capabilities.",
//       date: "2023-12-15",
//       image: "./images/prisma2.jpeg",
//     },
//     {
//       id: 2,
//       title: "eSakshya",
//       description:
//         "Platform for process recording of various events for the implementation of new criminal laws across country.",
//       date: "2024-01-10",
//       image: "./images/esakshya.png",
//     },
//     {
//       id: 3,
//       title: "eSign",
//       description:
//         "Online platforms and digital signatures for Punjab Police services, particularly the Public Grievance system and other online complaint mechanisms.",
//       date: "2024-02-20",
//       image: "./images/esign2.png",
//     },
//   ];

//   const testingApps = [
//     {
//       id: 4,
//       title: "Prisma Portal",
//       description:
//         "AI-powered financial analysis tool for personal and business finance management.",
//       date: "2023-11-30",
//       image: "./images/prisma2.jpeg",
//     },
//     {
//       id: 5,
//       title: "eSign",
//       description:
//         "Online platforms and digital signatures for Punjab Police services, particularly the Public Grievance system and other complaint mechanisms.",
//       date: "2023-12-05",
//       image: "./images/esign2.png",
//     },
//   ];

//   const currentNotices = [
//     {
//       id: 101,
//       title: "",
//       description:
//         "All developers must attend the Q4 product roadmap review session on Friday at 2 PM in the main conference room.",
//       date: "2023-11-15",
//       type: "meeting",
//     },
//     {
//       id: 102,
//       title: "New Security Protocols",
//       description:
//         "Important updates to our security protocols. Complete the new training module by November 30th.",
//       date: "2023-11-10",
//       type: "notice",
//     },
//     {
//       id: 103,
//       title: "Beta Testing Guidelines",
//       description:
//         "Updated guidelines for beta testing procedures now available. Please review before starting new testing cycles.",
//       date: "2023-11-05",
//       type: "manual",
//     },
//   ];

//   const archivedNotices = [
//     {
//       id: 201,
//       title: "Q3 Product Roadmap Review",
//       description:
//         "Meeting notes and action items from the Q3 roadmap review session.",
//       date: "2023-08-15",
//       type: "meeting",
//     },
//     {
//       id: 202,
//       title: "Old Security Policy",
//       description: "Previous version of security protocols for reference only.",
//       date: "2023-07-20",
//       type: "notice",
//     },
//   ];

//   const userManuals = [
//     {
//       id: 301,
//       title: "API Integration Guide",
//       description:
//         "Comprehensive guide for integrating with our latest API endpoints with examples in multiple programming languages.",
//       date: "2023-10-01",
//       type: "manual",
//     },
//     {
//       id: 302,
//       title: "UI Component Library",
//       description:
//         "Documentation for using our React component library with examples and best practices.",
//       date: "2023-09-15",
//       type: "manual",
//     },
//   ];

//   // Filters
//   const filteredNotices = currentNotices.filter(
//     (notice) =>
//       notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       notice.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const filteredArchives = archivedNotices.filter(
//     (notice) =>
//       notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       notice.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const filteredManuals = userManuals.filter(
//     (manual) =>
//       manual.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       manual.description.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div>
//       <header>
//         <div className="latest-container">
//           <h1>Latest Updates</h1>
//         </div>
//       </header>

//       <main className="latest-container">
        
//         {/* Notices Section */}
//         <section>
//           <div className="tabs">
//             <div
//               className={`tab ${activeTab === "notices" ? "active" : ""}`}
//               onClick={() => setActiveTab("notices")}
//             >
//               Current Notices
//             </div>
//             <div
//               className={`tab ${activeTab === "archives" ? "active" : ""}`}
//               onClick={() => setActiveTab("archives")}
//             >
//               Archived Notices
//             </div>
//             <div
//               className={`tab ${activeTab === "manuals" ? "active" : ""}`}
//               onClick={() => setActiveTab("manuals")}
//             >
//               User Manuals
//             </div>
//           </div>

//           <div className="search-bar">
//             <input
//               type="text"
//               placeholder="Search notices and manuals..."
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           {/* Auto vertical scroll lists */}
//           {activeTab === "notices" && (
//             <div
//               className={`notice-scroll ${isScrollPaused ? "paused" : ""}`} 
//               onMouseEnter={() => setIsScrollPaused(true)}
//               onMouseLeave={() => setIsScrollPaused(false)}
//             >
//               <div className="notice-list">
//                 {[...filteredNotices, ...filteredNotices].map((notice, idx) => (
//                   <div className="notice-item" key={idx}>
//                     <div className="notice-header">
//                       <span className="notice-title">{notice.title}</span>
//                       {notice.type === "meeting" && (
//                         <span className="badge badge-notice">Meeting</span>
//                       )}
//                       {notice.type === "notice" && (
//                         <span className="badge">Notice</span>
//                       )}
//                       {notice.type === "manual" && (
//                         <span className="badge badge-manual">Manual</span>
//                       )}
//                     </div>
//                     <div className="notice-date">{notice.date}</div>
//                     <div className="notice-description">
//                       {notice.description}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {activeTab === "archives" && (
//             <div
//               className={`notice-scroll ${isScrollPaused ? "paused" : ""}`} 
//               onMouseEnter={() => setIsScrollPaused(true)}
//               onMouseLeave={() => setIsScrollPaused(false)}
//             >
//               <div className="notice-list">
//                 {[...filteredArchives, ...filteredArchives].map(
//                   (notice, idx) => (
//                     <div className="notice-item" key={idx}>
//                       <div className="notice-header">
//                         <span className="notice-title">{notice.title}</span>
//                         {notice.type === "meeting" && (
//                           <span className="badge badge-notice">Meeting</span>
//                         )}
//                         {notice.type === "notice" && (
//                           <span className="badge">Notice</span>
//                         )}
//                       </div>
//                       <div className="notice-date">{notice.date}</div>
//                       <div className="notice-description">
//                         {notice.description}
//                       </div>
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>
//           )}

//           {activeTab === "manuals" && (
//             <div
//               className={`notice-scroll ${isScrollPaused ? "paused" : ""}`} 
//               onMouseEnter={() => setIsScrollPaused(true)}
//               onMouseLeave={() => setIsScrollPaused(false)}
//             >
//               <div className="notice-list">
//                 {[...filteredManuals, ...filteredManuals].map(
//                   (manual, idx) => (
//                     <div className="notice-item" key={idx}>
//                       <div className="notice-header">
//                         <span className="notice-title">{manual.title}</span>
//                         <span className="badge badge-manual">Manual</span>
//                       </div>
//                       <div className="notice-date">{manual.date}</div>
//                       <div className="notice-description">
//                         {manual.description}
//                       </div>
//                     </div>
//                   )
//                 )}
//               </div>
//             </div>
//           )}
//         </section>
//         {/* Upcoming Apps Horizontal Infinite Scroll */}
//         <section>
//           <h2 className="upcom_heading">Upcoming Apps/Portals</h2>
//           <div
//             className={`scroll-container ${isScrollPaused ? "paused" : ""}`} 
//             onMouseEnter={() => setIsScrollPaused(true)}
//             onMouseLeave={() => setIsScrollPaused(false)}
//           >
//             <div className="scroll-track">
//               {[...upcomingApps, ...upcomingApps].map((app, idx) => (
//                 <div className="card fixed-size" key={idx}>
//                   <div className="card-image">
//                     <img src={app.image} alt={app.title} />
//                   </div>
//                   <div className="card-header">
//                     <div className="card-title">{app.title}</div>
//                     <div className="card-status status-upcoming">Upcoming</div>
//                   </div>
//                   <div className="card-content">{app.description}</div>
//                   <div className="card-footer">
//                     <span>Release date: {app.date}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* Testing Apps Horizontal Infinite Scroll */}
//         <section>
//           <h2 className="latestpage_heading">Apps/Portals in Testing</h2>
//           <div
//             className={`scroll-container ${isScrollPaused ? "paused" : ""}`} 
//             onMouseEnter={() => setIsScrollPaused(true)}
//             onMouseLeave={() => setIsScrollPaused(false)}
//           >
//             <div className="scroll-track">
//               {[...testingApps, ...testingApps].map((app, idx) => (
//                 <div className="card fixed-size" key={idx}>
//                   <div className="card-image">
//                     <img src={app.image} alt={app.title} />
//                   </div>
//                   <div className="card-header">
//                     <div className="card-title">{app.title}</div>
//                     <div className="card-status status-testing">Testing</div>
//                   </div>
//                   <div className="card-content">{app.description}</div>
//                   <div className="card-footer">
//                     <span>Testing until: {app.date}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//       </main>
//     </div>
//   );
// };

// export default LatestPage;
import React, { useState } from "react";
import "./LatestPage.css";

const LatestPage = () => {
  const [activeTab, setActiveTab] = useState("notices");
  const [searchTerm, setSearchTerm] = useState("");
  const [isScrollPaused, setIsScrollPaused] = useState(false);

  const upcomingApps = [
    {
      id: 1,
      title: "PRISMA Portal",
      description: "Next-gen dashboard for analytics with AI-powered insights and predictive modeling capabilities.",
      date: "2023-12-15",
      image: "https://placehold.co/400x225?text=PRISMA\nDashboard",
      color: "#6366F1"
    },
    {
      id: 2,
      title: "eSakshya",
      description: "Platform for process recording of various events for the implementation of new criminal laws across country.",
      date: "2024-01-10",
      image: "https://placehold.co/400x225?text=eSakshya\nProcess+Recording",
      color: "#F59E0B"
    },
    {
      id: 3,
      title: "eSign",
      description: "Digital signature platform for Punjab Police services, including Public Grievance system.",
      date: "2024-02-20",
      image: "https://placehold.co/400x225?text=eSign\nDigital+Signatures",
      color: "#10B981"
    },
  ];

  const testingApps = [
    {
      id: 4,
      title: "Prisma Portal",
      description: "AI-powered financial analysis tool for personal and business finance management.",
      date: "2023-11-30",
      image: "https://placehold.co/400x225?text=Prisma\nFinancial+Analysis",
      color: "#3B82F6"
    },
    {
      id: 5,
      title: "eSign Beta",
      description: "Next generation digital signature platform with enhanced security features.",
      date: "2023-12-05",
      image: "https://placehold.co/400x225?text=eSign+Beta\nv2.0",
      color: "#8B5CF6"
    },
  ];

  const currentNotices = [
    {
      id: 101,
      title: "Q4 Product Roadmap",
      description: "All developers must attend the Q4 product roadmap review session on Friday at 2 PM in the main conference room.",
      date: "2023-11-15",
      type: "meeting",
      icon: "📅"
    },
    {
      id: 102,
      title: "Security Updates",
      description: "Important updates to our security protocols. Complete the new training module by November 30th.",
      date: "2023-11-10",
      type: "alert",
      icon: "🔒"
    },
    {
      id: 103,
      title: "Beta Testing Guide",
      description: "Updated guidelines for beta testing procedures now available. Please review before starting new testing cycles.",
      date: "2023-11-05",
      type: "manual",
      icon: "📋"
    },
  ];

  const filteredNotices = currentNotices.filter(notice => 
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    notice.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="modern-container">
      <header className="modern-header">
        <h1>Latest Updates</h1>
        <p className="subtitle">Stay informed about new releases and important announcements</p>
      </header>

      <main className="modern-main">
        <section className="search-section">
          <div className="tabs-container">
            <div className={`tab ${activeTab === "notices" ? "active" : ""}`}
                 onClick={() => setActiveTab("notices")}>
              <span>Notices</span>
            </div>
            <div className={`tab ${activeTab === "archives" ? "active" : ""}`}
                 onClick={() => setActiveTab("archives")}>
              <span>Archives</span>
            </div>
            <div className={`tab ${activeTab === "manuals" ? "active" : ""}`}
                 onClick={() => setActiveTab("manuals")}>
              <span>Manuals</span>
            </div>
          </div>
          
          <div className="search-wrapper">
            <input
              type="text"
              placeholder="Search notices..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="modern-search"
            />
            <div className="search-icon">
              <svg viewBox="0 0 24 24" width="20" height="20">
                <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 001.48-5.34c-.47-2.78-2.79-5-5.59-5.34a6.505 6.505 0 00-7.27 7.27c.34 2.8 2.56 5.12 5.34 5.59a6.5 6.5 0 005.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
              </svg>
            </div>
          </div>
        </section>

        {activeTab === "notices" && (
          <section className="notices-container">
            {filteredNotices.map((notice) => (
              <div className="notice-card" key={notice.id}>
                <div className="notice-icon" style={{ backgroundColor: '#F0F9FF' }}>
                  {notice.icon}
                </div>
                <div className="notice-content">
                  <div className="notice-header">
                    <h3>{notice.title}</h3>
                    <span className="notice-date">{notice.date}</span>
                  </div>
                  <p className="notice-desc">{notice.description}</p>
                  <div className="notice-tag">{notice.type}</div>
                </div>
              </div>
            ))}
          </section>
        )}

        <section className="carousel-section">
          <h2>Upcoming Releases</h2>
          <div className={`app-carousel ${isScrollPaused ? "paused" : ""}`}
               onMouseEnter={() => setIsScrollPaused(true)}
               onMouseLeave={() => setIsScrollPaused(false)}>
            {[...upcomingApps, ...upcomingApps].map((app, idx) => (
              <div className="app-card" key={idx} style={{ borderTopColor: app.color }}>
                <div className="app-image">
                  <img src={app.image} alt={`Screenshot of ${app.title} application`} />
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
          </div>
        </section>

        <section className="carousel-section">
          <h2>Currently in Testing</h2>
          <div className={`app-carousel ${isScrollPaused ? "paused" : ""}`}
               onMouseEnter={() => setIsScrollPaused(true)}
               onMouseLeave={() => setIsScrollPaused(false)}>
            {[...testingApps, ...testingApps].map((app, idx) => (
              <div className="app-card" key={idx} style={{ borderTopColor: app.color }}>
                <div className="app-image">
                  <img src={app.image} alt={`Screenshot of ${app.title} application`} />
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
          </div>
        </section>
      </main>
    </div>
  );
};

export default LatestPage;
