import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialsSection = () => {
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 768,
        settings: { slidesToShow: 1, slidesToScroll: 1 },
      },
    ],
  };

  const testimonials = [
    {
      text: "Assam Police has implemented the Virtual Private Network (VPN) as an alternate connectivity to access CCTNS (Crime and Criminal Tracking Network & Systems) services in a secured and encrypted manner over a less secured network. The VPN technology ensures the data movement between the Police Stations and central databases.",
      state: "Assam",
      category: "Another module around CCTNS",
      title: "VPN Technology in CCTNS",
      pdf: "/pdfs/assam_vpn.pdf",
    },
    {
      text: "Chhattisgarh Police operationalized the Crime and Criminal Tracking Network & Systems (CCTNS), a Mission Mode Project of MHA, in 2013. The project currently operates in the O&M phase, connecting 481 police stations and 228 higher offices seamlessly with the State Data Centre.",
      state: "Chhattisgarh",
      category: "Applications for the Hotel Entry",
      title: "Guest /Visitor (Hotel) Entry at Chhattisgarh",
      pdf: "/pdfs/chhattisgarh_hotel_entry.pdf",
    },
    {
      text: "To effectively utilize the CCTNS data and bridge the gap in criminal identification, Punjab police has taken a ground-breaking step by introducing the Information sheet (Parcha-12) Module: A step towards Criminal Profiling, a first-of-its-kind implementation in India.",
      state: "Punjab",
      category: "Another module around CCTNS",
      title: "Information sheet (Parcha-12) Module: A step towards Criminal Profiling",
      pdf: "/pdfs/punjab_parcha12.pdf",
    },
    {
      text: "The e-Investigation module is designed as an integrated tool within the Aarakhi app to assist investigating officers by providing easy access to all necessary forms, reports, and court prayers for various types of cases. This module is intended to streamline the investigation process by offering a structured, accessible menu.",
      state: "Odisha",
      category: "Another module around CCTNS",
      title: "e-Investigation",
      pdf: "/pdfs/odisha_einvestigation.pdf",
    },
  ];

  const truncateText = (text) => {
    const words = text.split(" ");
    if (words.length <= 30) return text;
    return words.slice(0, 30).join(" ") + "...";
  };

  return (
    <section className="testimonials">
      <div className="container">
        <div className="section-title">
          <h2>Success Stories</h2>
          <p>Success cases from various states in digital law enforcement projects.</p>
        </div>
        <Slider {...settings} className="testimonial-slider">
          {testimonials.map((item, index) => (
            <div key={index} className="testimonial-card">
              <p className="testimonial-text">
                {truncateText(item.text)}{" "}
                {item.text.split(" ").length > 30 && (
                  <button
                    onClick={() => setSelectedTestimonial(item)}
                    style={{
                      color: "blue",
                      textDecoration: "underline",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      padding: 0,
                    }}
                  >
                    Know More
                  </button>
                )}
              </p>
              <div className="testimonial-author">
                <div className="author-info">
                  <h4>State:- {item.state}</h4>
                  <h4>Category:- {item.category}</h4>
                  <p>
                    <strong>{item.title}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* Modal */}
        {selectedTestimonial && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              backgroundColor: "rgba(0,0,0,0.6)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "#fff",
                padding: "20px",
                borderRadius: "10px",
                width: "80%",
                maxWidth: "600px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.3)",
              }}
            >
              <h3>{selectedTestimonial.title}</h3>
              <p style={{ margin: "15px 0" }}>{selectedTestimonial.text}</p>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <a
                  href={selectedTestimonial.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    background: "#007bff",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    textDecoration: "none",
                  }}
                >
                  Download PDF
                </a>
                <button
                  onClick={() => setSelectedTestimonial(null)}
                  style={{
                    background: "red",
                    color: "#fff",
                    padding: "10px 20px",
                    borderRadius: "5px",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
