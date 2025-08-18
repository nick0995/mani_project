import React, { useState } from "react";

const SocialSidebar = () => {
  const [openIndex, setOpenIndex] = useState(null);

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
      bg: "#b44646ff",
      icon: "./images/X_icon.svg.original.png",
    },
    {
      name: "Official Website",
      url: "https://x.com/PunjabPoliceInd",
      bg: "#000715",
      icon: "./images/logoo.png",
    },
  ];

  const handleClick = (index) => {
    // Toggle the clicked one, close if already open
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="content">
      <div className="si-sidebar">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`social-icon ${openIndex === index ? "open" : ""}`}
            style={{ background: link.bg }}
            onClick={(e) => {
              e.preventDefault(); // stop link from opening instantly
              handleClick(index);
            }}
          >
            <img src={link.icon} alt={link.name} />
            <span>{link.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default SocialSidebar;
