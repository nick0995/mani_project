import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ onLoginClick, isLoggedIn, username, onLogout, getNavLinkClass }) => {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isNavOpen, setIsNavOpen] = useState(false);

  const coursesRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (coursesRef.current && !coursesRef.current.contains(e.target)) {
        setCoursesOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    };
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        setCoursesOpen(false);
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handleSearch = () => {
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
      setSearchQuery("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="nav_box shadow-sm">
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container-fluid">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <video
              id="logoVideo"
              className="logo-video me-2"
              autoPlay
              muted
              loop
              playsInline
              style={{ height: "40px" }}
            >
              <source src="/videos/asd.mp4" type="video/mp4" />
            </video>
            <span className="fw-bold">Punjab Police</span>
            <span className="ms-1 d-none d-sm-inline">Training Program</span>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsNavOpen(!isNavOpen)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Collapsible Menu */}
          <div className={`collapse navbar-collapse ${isNavOpen ? "show" : ""}`} id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-lg-center">
              <li className="nav-item">
                <Link className={`nav-link ${getNavLinkClass("/")}`} to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${getNavLinkClass("/latest")}`} to="/latest">
                  Latest
                </Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${getNavLinkClass("/about")}`} to="/about">
                  About
                </Link>
              </li>

              {/* ✅ Courses Dropdown */}
              <li className="nav-item dropdown position-relative" ref={coursesRef}>
                <button
                  className="nav-link btn btn-link text-dark dropdown-toggle"
                  onClick={() => setCoursesOpen(!coursesOpen)}
                >
                  Courses
                </button>
                <ul className={`dropdown-menu ${coursesOpen ? "show" : ""}`}>
                  <li>
                    <Link
                      className={`dropdown-item ${getNavLinkClass("/icjs")}`}
                      to="/icjs"
                      onClick={() => setCoursesOpen(false)}
                    >
                      ICJS
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`dropdown-item ${getNavLinkClass("/cctns")}`}
                      to="/cctns"
                      onClick={() => setCoursesOpen(false)}
                    >
                      CCTNS
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`dropdown-item ${getNavLinkClass("/khoj")}`}
                      to="/khoj"
                      onClick={() => setCoursesOpen(false)}
                    >
                      KHOJ
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link
                      className={`dropdown-item ${getNavLinkClass("/new-criminal-law")}`}
                      to="/new-criminal-law"
                      onClick={() => setCoursesOpen(false)}
                    >
                      New Criminal Law
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Search Box */}
              <li className="nav-item my-2 my-lg-0 mx-lg-3">
                <div className="search-wrapper position-relative d-flex align-items-center">
                  <input
                    type="text"
                    value={searchQuery}
                    placeholder="Search..."
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyPress}
                    className="form-control ps-3"
                    style={{ borderRadius: "40px", height: "36px", minWidth: "200px" }}
                  />
                  <button className="btn position-absolute end-0 me-1" onClick={handleSearch}>
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </li>

              {/* ✅ User Dropdown */}
              {!isLoggedIn ? (
                <li className="nav-item">
                  <button className="btn btn-outline-primary ms-lg-3 w-100" onClick={onLoginClick}>
                    Login
                  </button>
                </li>
              ) : (
                <li className="nav-item dropdown position-relative" ref={userMenuRef}>
                  <button
                    className="d-flex align-items-center btn btn-link text-dark dropdown-toggle"
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                  >
                    <svg
                      style={{ width: "28px", height: "28px" }}
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3z" />
                    </svg>
                    <span className="ms-2">{username}</span>
                  </button>
                  <ul className={`dropdown-menu dropdown-menu-end ${userMenuOpen ? "show" : ""}`}>
                    <li>
                      <Link className="dropdown-item" to="/mylearning" onClick={() => setUserMenuOpen(false)}>
                        My Learning
                      </Link>
                    </li>
                    <li>
                      <hr className="dropdown-divider" />
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={onLogout}>
                        Logout
                      </button>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
