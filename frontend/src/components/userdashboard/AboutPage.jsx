import React from "react";
import EmergencySidebar from "./EmergencySidebar";

const AboutPage = () => {
  return (
    <>
      {/* Hero Section */}
      <section
        className="about-hero text-white py-12 text-center"
        style={{ backgroundColor: "#000715" }}
      >
        <h1>About Us</h1>
      </section>

      {/* Sidebar + About Layout */}
      <div className="container-fluid py-4">
        <div className="row">
          {/* ✅ Emergency Sidebar LEFT (Sticky) */}
          <div className="col-md-3">
            <div className="sticky-top" style={{ top: "80px", zIndex: 2 }}>
              <EmergencySidebar />
            </div>
          </div>

          {/* ✅ About Section on the RIGHT */}
          <div className="col-md-9">
            <div className="About-section">
              <h3 className="text-center text-white"></h3>
            </div>

            <div className="col-md-11 mx-auto py-4 About-section-details text-justify">
              {/* Punjab Police Training Program */}
              <h5 className="section-header">
                <i className="fas fa-shield-alt text-primary"></i>
                Punjab Police Training Program
              </h5>
              <div className="d-flex align-items-center mb-3">
                <img
                  src="/images/logoo.png"
                  alt="Punjab Police Logo"
                  className="me-3"
                  style={{ width: "80px", height: "80px" }}
                />
                <p>
                  Punjab Police has a long-standing tradition of professionalism,
                  courage, and service to the people. To meet the demands of
                  modern law enforcement, the Punjab Police Training Program
                  focuses on holistic development of officers through physical
                  training, legal education, leadership development, and
                  advanced courses in technology-driven policing.
                </p>
              </div>
              <p>
                Training institutes under Punjab Police emphasize community
                engagement, respect for human rights, and citizen-friendly
                policing. Special modules on counter-terrorism, cyber security,
                women & child safety, and digital forensics are also integrated
                to prepare officers for present and future challenges. This
                continuous professional development helps Punjab Police uphold
                its motto of{" "}
                <strong>
                  "Shubh Karman te Kabahun Na Tarun" “ਸ਼ੁਭ ਕਰਮਨ ਤੇ ਕਬਹੂੰ ਨ
                  ਟਰੋਂ”
                </strong>{" "}
                which reflects a commitment to righteous action and doing good.
              </p>

              {/* Training & Capacity Building */}
              <h5 className="section-header">
                <i className="fas fa-graduation-cap text-success"></i>
                Training & Capacity Building Programs
              </h5>
              <div className="row align-items-center mb-4">
                <div className="col-md-4 text-center">
                  <img
                    src="/images/9400012.jpg"
                    alt="Police Training"
                    className="img-fluid rounded shadow"
                  />
                </div>
                <div className="col-md-8">
                  <p>
                    Continuous training and capacity building are the backbone
                    of modern policing. Specialized programs are conducted to
                    strengthen the knowledge of police personnel in areas like
                    cybercrime investigation, forensic science, data analytics,
                    community policing, and use of digital policing platforms
                    such as{" "}
                    <strong>
                      CCTNS (Crime and Criminal Tracking Network & Systems)
                    </strong>{" "}
                    and{" "}
                    <strong>
                      ICJS (Interoperable Criminal Justice System)
                    </strong>
                    .
                  </p>
                  <p>
                    These training modules aim to ensure that officers are
                    well-equipped to deal with evolving challenges in law
                    enforcement while maintaining efficiency, transparency, and
                    accountability. Officers are also encouraged to undergo
                    refresher courses and e-learning programs (like CyTrain) to
                    stay updated with the latest technological and legal
                    developments.
                  </p>
                </div>
              </div>

              {/* ✅ CCTNS Section */}
              <h5 className="section-header">
                <i className="fas fa-network-wired text-info"></i>
                Crime and Criminal Tracking Network &amp; Systems (CCTNS)
              </h5>
              <p>
                The Crime and Criminal Tracking Network &amp; Systems (CCTNS)
                project was launched in 2009 as a mission mode project under the
                National e-Governance Plan of India. Its primary goal is to
                create a nationwide integrated system for effective policing and
                sharing of crime and criminal intelligence across all police
                stations in the country.
              </p>
              <p>
                As of July 2021, the CCTNS application has been deployed in{" "}
                <strong>16,276 police stations</strong> (100%) and connectivity
                has been provided in <strong>15,735 stations</strong>. More than{" "}
                <strong>28 crore records</strong> are available in the National
                Database, empowering police stations to investigate, detect, and
                prevent crime more effectively. The project has also facilitated
                the online filing of FIRs, real-time crime monitoring, and
                seamless data exchange across states and agencies.
              </p>

              {/* ✅ NCRB Section */}
              <h5 className="section-header">
                <i className="fas fa-balance-scale text-warning"></i>
                About NCRB
              </h5>
              <p>
                The <strong>National Crime Records Bureau (NCRB)</strong> was
                set up in 1986 as the central agency responsible for collecting
                and analyzing crime data in India. It maintains the National
                Crime Database and ensures that investigators have access to
                reliable data for linking crimes to criminals.
              </p>
              <p>
                NCRB also manages the <strong>National Digital Police Portal</strong>,
                launched in 2017, which provides citizen services such as online
                complaint filing, verification of tenants/employees, search for
                missing persons, and access to proclaimed offenders list.
                Additionally, NCRB maintains specialized systems like the{" "}
                <strong>National Database of Sexual Offenders (NDSO)</strong>,{" "}
                <strong> Cri-MAC (Crime – Multi Agency Centre)</strong>, and{" "}
                <strong> CyTrain e-learning portal</strong>.
              </p>

              {/* ✅ Phase II */}
              <p>
                <strong>1. CCTNS Phase II includes:</strong>
              </p>
              <ul>
                <li>
                  <i className="fas fa-link me-2 text-secondary"></i> Integration
                  with systems like NAFIS, AFRS, Vaahan, Passport, IVFRT &
                  TrackChild.
                </li>
                <li>
                  <i className="fas fa-database me-2 text-secondary"></i>{" "}
                  Connecting non-police FIR registering units (Excise, Forest,
                  Transport, CBI, NCB etc.).
                </li>
                <li>
                  <i className="fas fa-server me-2 text-secondary"></i> Upgrading
                  hardware & infrastructure at all police stations and higher
                  offices.
                </li>
              </ul>

              <p>
                <strong>2. ICJS:</strong>{" "}
                <i className="fas fa-gavel text-danger ms-2"></i> A system to
                enable seamless integration of police, courts, prisons,
                prosecution, and forensics.
              </p>
              <p>
                <strong>3. Crime Data Analytics:</strong>{" "}
                <i className="fas fa-chart-line text-success ms-2"></i> Advanced
                analytics for strategic planning & predictive policing.
              </p>

              {/* ✅ Citizen Services */}
              <h5 className="section-header">
                <i className="fas fa-users text-purple"></i>
                Central Citizen Services - National Crime Records Bureau
              </h5>
              <ul>
                <li>
                  <i className="fas fa-user-search me-2 text-primary"></i>
                  <strong>Missing Person Search:</strong> nationwide database
                  access.
                </li>
                <li>
                  <i className="fas fa-car me-2 text-primary"></i>
                  <strong>Generate Vehicle NOC:</strong> verify before
                  second-hand purchase.
                </li>
                <li>
                  <i className="fas fa-user-slash me-2 text-primary"></i>
                  <strong>Proclaimed Offenders:</strong> citizen cooperation
                  system.
                </li>
                <li>
                  <i className="fas fa-map-marker-alt me-2 text-primary"></i>
                  <strong>Locate Nearest Police Station:</strong> GPS-enabled
                  emergency app.
                </li>
              </ul>

              <p>
                These services promote the <strong>“Ease of Living”</strong> and
                strengthen trust between citizens and law enforcement.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutPage;
