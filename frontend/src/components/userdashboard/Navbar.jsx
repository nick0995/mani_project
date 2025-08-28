import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
const Navbar = ({ onLoginClick, isLoggedIn, username, onLogout, getNavLinkClass }) => {
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const coursesRef = useRef(null);
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdowns on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (coursesRef.current && !coursesRef.current.contains(e.target)) setCoursesOpen(false);
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) setUserMenuOpen(false);
    };
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setCoursesOpen(false);
        setUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const handleSearch = () => {
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`);
      setSearchQuery('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };
  

  return (
    <div className="nav_box">
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <video id="logoVideo" className="logo-video" autoPlay muted loop playsInline>
            <source src="/videos/asd.mp4" type="video/mp4" />
          </video>

          <Link className="navbar-brand" to="/">
            <span>Punjab Police</span> Training Program
          </Link>

        {/* ✅ Search Box */}
              <div className="search-wrapper position-relative ms-3 d-flex align-items-center" style={{ width: '250px' }}>
                  {/* 🔁 Vertical Scrolling Suggestions Behind Input */}
                  {searchQuery === '' && (
                    <div className="vertical-marquee">
                      <div className="vertical-marquee-inner">
                        <div>Search ICJS....</div>
                        <div>Search CCTNS....</div>
                        <div>Search KHOJ....</div>
                        <div>New Criminal Law....</div>
                        <div>Search CCTNS....</div>
                          <div>Search KHOJ....</div>
                          <div>Search ICJS....</div> {/* Repeat first to loop smoothly */}
                      </div>
                      <button type="button" className="btn" onClick={handleSearch}>
                      <i className="fas fa-search"></i>
                    </button>
                    </div>
                  )}
                  
                    <input
                      type="text"
                      placeholder=""
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="form-control ps-3"
                        style={{
                        position: 'relative',
                        
                        height: '38px',
                      }}
                    />
                    
                  </div>
        
                  <button className="navbar-toggler" type="button">
                    <span className="navbar-toggler-icon"></span>
                  </button>
        
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                      <li className="nav-item">
                        <Link className={`nav-link ${getNavLinkClass('/')}`} to="/">Home</Link>
                      </li>
                        <li className="nav-item">
                        <Link className={`nav-link ${getNavLinkClass('/latest')}`} to="/latest">Latest</Link>
                      </li>
                       <li className="nav-item">
                        <Link className={`nav-link ${getNavLinkClass('/about')}`} to="/about">About</Link>
                      </li>
                    
                      <li className="nav-item position-relative" ref={coursesRef}>
                        <button
                          className="nav-link btn btn-link text-dark"
                          onClick={() => setCoursesOpen(!coursesOpen)}
                          aria-expanded={coursesOpen}
                        >
                          Courses ▾
                        </button>
                        {coursesOpen && (
                          <ul className="dropdown-menu show glassy-dropdown">
                            <li><Link className={`dropdown-item ${getNavLinkClass('/icjs')}`} to="/icjs" onClick={() => setCoursesOpen(false)}>ICJS</Link></li>
                            <li><Link className={`dropdown-item ${getNavLinkClass('/cctns')}`} to="/cctns" onClick={() => setCoursesOpen(false)}>CCTNS</Link></li>
                            <li><Link className={`dropdown-item ${getNavLinkClass('/khoj')}`} to="/khoj" onClick={() => setCoursesOpen(false)}>KHOJ</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><Link className={`dropdown-item ${getNavLinkClass('/new-criminal-law')}`} to="/new-criminal-law" onClick={() => setCoursesOpen(false)}>New Criminal Law</Link></li>
                          </ul>
                        )}
                      </li>
                    </ul>
        
                    {!isLoggedIn ? (
                      <div className="user-avatar">
                        <button className="btn btn-outline-primary ms-3" onClick={onLoginClick}>Login</button>
                      </div>
                    ) : (
                      <div className="dropdown ms-3 position-relative" ref={userMenuRef}>
                        <button
                          className="d-flex align-items-center btn btn-link text-dark"
                          onClick={() => setUserMenuOpen(!userMenuOpen)}
                        >
                          <svg style={{ width: '30px', height: '30px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z"/>
                          </svg>
                          <span className="ms-2">{username}</span>
                        </button>
                        {userMenuOpen && (
                          <ul className="dropdown-menu dropdown-menu-end glassy-dropdown">
                            <li><Link className="dropdown-item" to="/mylearning" onClick={() => setUserMenuOpen(false)}>My Learning</Link></li>
                            <li><hr className="dropdown-divider" /></li>
                            <li><button className="dropdown-item" onClick={onLogout}>Logout</button></li>
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </nav>
            </div>
          );
        };
        
        export default Navbar;
        