import React, { useState, useRef, useEffect } from "react";

const SocialSidebar = () => {
  const [hoverIndex, setHoverIndex] = useState(null);
  const sidebarRef = useRef(null);

  const links = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/PunjabPoliceIndia",
      bg: "#39569c",
      icon: "./images/fb.original.jpg",
    },
    {
      name: "WhatsApp",
      url: "https://www.whatsapp.com/channel/0029VaA5aH7JP212XardE53X",
      bg: "#25D366",
      icon: "./images/whapp.original.png",
    },
    {
      name: "YouTube",
      url: "https://www.youtube.com/c/PunjabPoliceIndiaOfficial",
      bg: "#c4302b",
      icon: "./images/ytube.original.png",
    },
    {
      name: "Twitter X",
      url: "https://x.com/PunjabPoliceInd",
      bg: "#000000",
      icon: "./images/X_icon.svg.original.png",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/punjabpoliceind/?hl=en",
      bg: "#ff0069",
      icon: "./images/instagram.png",
    },
    {
      name: "Official Website",
      url: "https://punjabpolice.gov.in",
      bg: "#000715",
      icon: "./images/logoo.png",
    },
  ];

  const handleLinkClick = (url) => {
    const confirmed = window.confirm(
      "You are being redirected to an external website. Do you want to continue?"
    );

    if (confirmed) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  // Reset when mouse leaves entire sidebar
  useEffect(() => {
    const handleOutside = (e) => {
      if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setHoverIndex(null);
      }
    };
    document.addEventListener("mousemove", handleOutside);
    return () => {
      document.removeEventListener("mousemove", handleOutside);
    };
  }, []);

  return (
    <section id="content">
      <div className="si-sidebar" ref={sidebarRef}>
        {links.map((link, index) => (
          <div
            key={index}
            className={`social-icon ${hoverIndex === index ? "open" : ""}`}
            style={{ background: link.bg }}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
          >
            <img
              src={link.icon}
              alt={link.name}
              style={{ cursor: "pointer" }}
            />

            {hoverIndex === index && (
              <span
                onClick={() => handleLinkClick(link.url)}
                style={{
                  cursor: "pointer",
                  textDecoration: "underline",
                  marginLeft: "8px",
                }}
              >
                {link.name}
              </span>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default SocialSidebar;
