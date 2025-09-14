import React from 'react';

const CallToAction = ({ onLoginClick }) => {
  return (
    <section className="cta py-5  text-white">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-8">
            <h3 className="mb-3">Ready to Boost Your Skills ?</h3>
            <p className="mb-0">Join thousands of professionals who have successfully certified with our programs.</p>
          </div>
          <div className="col-lg-4 text-lg-end">
            <button className="btn btn-outline-primary ms-3 " onClick={onLoginClick}>Get Started Today</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
