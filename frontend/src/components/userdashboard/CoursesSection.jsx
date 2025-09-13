import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CoursesSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1, slidesToScroll: 1 } }
    ]
  };

  const courses = [
    {
      img: "/images/CCTNSLOGO.jpg",
      category: "Digital Policing",
      title: "CCTNS",
      desc: "Learn CCTNS (Crime and Criminal Tracking Network System) for effective policing.",
      duration: "1 Week"
    },
    {
      img: "/images/ICJS.jpg",
      category: "Digital Policing",
      title: "ICJS",
      desc: "Learn Inter-operable Criminal Justice System (ICJS) for effective policing.",
      duration: "1 Week"
    },
    {
      img: "/images/Designer.png",
      category: "Digital Policing",
      title: "KHOJ",
      desc: "An initiative by Punjab Police for effective policing in Punjab.",
      duration: "1 Week"
    },
    {
      img: "/images/ncl2.jpg",
      category: "Criminal",
      title: "New Criminal Laws",
      desc: "Learn about the latest updates and practices in criminal law.",
      duration: "2 Weeks"
    }
  ];

  return (
    <section className="relative py-16 bg-black overflow-hidden">
      {/* Neon Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-700 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-700 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Courses</h2>
          <p className="text-gray-300">Explore top-notch training programs for Punjab Police.</p>
        </div>

        <Slider {...settings} className="course-slider">
          {courses.map((course, idx) => (
            <div key={idx} className="p-4">
              <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="course-img">
                  <img src={course.img} alt={course.title} className="w-full h-48 object-cover" />
                </div>
                <div className="p-6">
                  <span className="text-yellow-400 text-sm font-medium">{course.category}</span>
                  <h3 className="text-2xl font-bold text-white mt-2">{course.title}</h3>
                  <p className="text-gray-300 mt-2 text-sm">{course.desc}</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-gray-400 text-sm">{course.duration}</span>
                    <button className="bg-gradient-to-r from-red-600 to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium hover:scale-105 transition-all">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default CoursesSection;
