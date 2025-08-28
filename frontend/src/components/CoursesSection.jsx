
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const CoursesSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,           
    autoplaySpeed: 2000, 
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section className="Courses">
      <div className="container">
        <div className="section-title">
          <h2>Featured Courses</h2>
          <p>Explore top-notch training programs.</p>
        </div>
        <Slider {...settings} className="course-slider">
          <div className="course-card">
            <div className="course-img">
              <img src="/images/CCTNSLOGO.jpg" alt="Course 1" />
            </div>
            <div className="course-info">
              <span className="course-category">Digital Policing</span>
              <h3 className="course-title">CCTNS</h3>
               <p class="course-desc">Learn CCTNS (Crime and Criminal Tracking Network System) for effective policing.</p>
              <div className="course-meta">
                <span>1 week</span>
              </div>
            </div>
          </div>
          <div className="course-card">
            <div className="course-img">
              <img src="/images/ICJS.jpg" alt="Course 2" />
            </div>
            <div className="course-info">
              <span className="course-category">Digital Policing </span>
              <h3 className="course-title">ICJS</h3>
              <p class="course-desc">Learn Inter-operable Criminal Justice System (ICJS) for effective policing..</p>
              <div className="course-meta">
                 <span>1 Week</span>
              </div>
            </div>
          </div>
          <div className="course-card">
            <div className="course-img">
              <img src="/images/Designer.png" alt="Course 3" />
            </div>
            <div className="course-info">
              <span class="course-category">Digital Policing</span>
                  <h4 class="course-title">KHOJ</h4>
                  <p class="course-desc">A initiative by Punjab Police for effective policing in Punjab.</p>
                  <div class="course-meta">
                  <span><i class="far fa-clock me-1"></i> 1 Week</span>
              </div>
            </div>
          </div>
          <div className="course-card">
            <div className="course-img">
              <img src="/images/ncl2.jpg" alt="Course 4" />
            </div>
            <div className="course-info">
              <span class="course-category">Criminal</span>
                  <h4 class="course-title">New Criminal laws</h4>
                  <p class="course-desc">Learn about the latest updates and practices in criminal law.</p>
                <div class="course-meta">
                  <span><i class="far fa-clock me-1"></i> 2 Week</span>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default CoursesSection;
