import React from 'react';


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-5 mb-lg-0">
            <div className="footer-logo">Punjab Police<span> Training Program</span></div>
            <p className="mt-3 mb-4">Providing quality professional training and certification programs to help individuals advance their careers.</p>
           <div className="social-links">
              <a href="https://www.facebook.com/PunjabPoliceIndia" target="_blank"><i className="fab fa-facebook-f"></i></a>
              <a href="https://x.com/PunjabPoliceind" target="_blank"><i className="fab fa-x-twitter"></i></a>
              <a href="https://www.instagram.com/punjabpoliceind/?hl=en" target="_blank"><i className="fab fa-instagram"></i></a>
              <a href="https://www.youtube.com/c/PunjabPoliceIndiaOfficial" target="_blank"><i className="fab fa-youtube"></i></a>
              <a href="https://www.whatsapp.com/channel/0029VaA5aH7JP212XardE53X" target="_blank"><i className="fab fa-whatsapp"></i></a>
              <a href="https://www.punjabpolice.gov.in/en/#" target="_blank"><i class="fa-solid fa-globe"></i></a>
            </div>
          </div>

          <div className="col-sm-4 col-lg-2 mb-5 mb-sm-0">
            <div className="footer-links">
              <h3>Courses</h3>
              <ul>
                <li><a href="#">All Courses</a></li>
                <li><a href="#">New Arrivals</a></li>
                <li><a href="#">Featured</a></li>
                <li><a href="#">Popular</a></li>
                <li><a href="#">Certification</a></li>
              </ul>
            </div>
          </div>

          <div className="col-sm-4 col-lg-2 mb-5 mb-sm-0">
            <div className="footer-links">
              <h3>Support</h3>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">FAQ</a></li>
                <li><a href="#">Feedback</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">Community</a></li>
              </ul>
            </div>
          </div>

          <div className="col-sm-4 col-lg-4">
            <div className="footer-links">
              <h3>Newsletter</h3>
              <p>Subscribe to get updates on new courses and offers.</p>
              <form className="mb-3 footer_form">
                <div className="input-group">
                  <input type="email" className="form-control" placeholder="Your Email" />
                  <button className="btn btn-light" type="button">Subscribe</button>
                </div>
              </form>
              <div>
                <i className="fas fa-phone me-2"></i> +91 9876543210<br />
                <i className="fas fa-envelope me-2"></i> info@punjabpolicetraining.com
              </div>
            </div>
          </div>
        </div>

        <div className="copyright">
          <p className="mb-0">&copy; 2025 Punjab Police Training Program. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
