import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Bell, Menu, Search, Home, BookOpen, CheckCircle, Clock, Star, Calendar, Trophy, Play, ChevronRight, LogOut, Shield } from "lucide-react";
import { GraduationCap, Target, Award, Users as UsersIcon } from 'lucide-react';
import './styles/mylearning.css';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="loading-spinner-container" style={{ backgroundColor: 'black' }}>
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, duration: 0.8 }}
      className="loading-spinner-content"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="loading-spinner-icon-wrapper"
      >
        <GraduationCap className="loading-spinner-icon" />
      </motion.div>
      <motion.h2 className="loading-spinner-title" style={{ color: 'white' }}>Officer's Dashboard</motion.h2>
      <motion.p className="loading-spinner-text" style={{ color: 'gray' }}>loading...</motion.p>
    </motion.div>
  </div>
);

// Stat Card Component
const StatCard = ({ title, value, icon: Icon, color, change, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="stat-card"
    style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
  >
    <div className="stat-card-content">
      <div className="stat-card-header">
        <div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
            className="stat-card-title"
            style={{ color: 'gray' }}
          >
            {title}
          </motion.p>
          <motion.p 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              delay: delay + 0.3, 
              type: "spring",
              stiffness: 300
            }}
            className="stat-card-value"
            style={{ color: 'white' }}
          >
            {value}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.4 }}
            className="stat-card-change"
            style={{ color: 'gray' }}
          >
            {change}
          </motion.p>
        </div>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className="stat-card-icon-wrapper"
          style={{ background: 'linear-gradient(to bottom right, #dc2626, #1d4ed8)' }}
        >
          <Icon className="stat-card-icon" style={{ color: 'white' }} />
        </motion.div>
      </div>
    </div>
  </motion.div>
);

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab, setSidebarOpen, officer, handleLogout }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  return (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: 0 }}
      exit={{ x: -300 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="sidebar-container lg:translate-x-0 lg:static lg:inset-0"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(10px)' }}
    >
      <div className="sidebar-header">
        <div className="sidebar-logo-wrapper">
          <div className="sidebar-logo-icon-bg" style={{ background: 'linear-gradient(to bottom right, #dc2626, #1d4ed8)' }}>
            <Shield className="sidebar-logo-icon" style={{ color: 'white' }} />
          </div>
          <div>
            <span className="sidebar-logo-text" style={{ color: '#fbbf24' }}>Officer Dashboard</span>
            <p className="sidebar-logo-subtext" style={{ color: 'gray' }}>Punjab Police</p>
          </div>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="sidebar-close-button lg:hidden" style={{ color: 'white' }}>✖</button>
      </div>

      {/* Profile section with dropdown */}
      <div className="sidebar-profile-section">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="sidebar-profile-card relative"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
        >
          <div
            className="sidebar-profile-info cursor-pointer"
            onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          >
            <div className="sidebar-profile-avatar-bg" style={{ background: 'linear-gradient(to bottom right, #dc2626, #1d4ed8)' }}>
              <User className="sidebar-profile-avatar-icon" style={{ color: 'white' }} />
            </div>
            <div>
              <p className="sidebar-profile-name" style={{ color: 'white' }}>{officer?.name || "Officer"}</p>
              <p className="sidebar-profile-academy" style={{ color: 'gray' }}>{officer?.rank || "Rank"}</p>
            </div>
          </div>

          {profileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-40 bg-gray-900 shadow-lg rounded-md overflow-hidden z-20 border border-gray-700"
            >
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" /> Logout
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>

      <nav className="sidebar-nav">
        {[
          { id: 'dashboard', label: 'Dashboard', icon: Target },
          { id: 'officer-details', label: 'Officer Details', icon: User },
          { id: 'calendar', label: 'Calendar', icon: Calendar },
          { id: 'achievements', label: 'Achievements', icon: Award }
        ].map((item, index) => (
          <motion.button
            key={item.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index + 0.3 }}
            onClick={() => {
              setActiveTab(item.id);
              setSidebarOpen(false);
            }}
            className={`sidebar-nav-button ${
              activeTab === item.id
                ? 'sidebar-nav-button-active'
                : 'sidebar-nav-button-inactive'
            }`}
            style={{
              backgroundColor: activeTab === item.id ? 'rgba(251, 191, 36, 0.2)' : 'transparent',
              color: activeTab === item.id ? '#fbbf24' : 'gray'
            }}
          >
            <item.icon className="sidebar-nav-icon" />
            <span>{item.label}</span>
          </motion.button>
        ))}
      </nav>
    </motion.div>
  );
};

// Header Component
const Header = ({ searchQuery, setSearchQuery, setSidebarOpen, officer, handleLogout }) => {
  const [headerMenuOpen, setHeaderMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="header-container"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', backdropFilter: 'blur(10px)' }}
    >
      <div className="header-content">
        <div className="header-left-section">
          <button
            onClick={() => setSidebarOpen(true)}
            className="header-menu-button lg:hidden"
            style={{ color: 'white' }}
          >
            <Menu className="w-6 h-6" />
          </button>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="header-search-wrapper group"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
          >
            <Search className="header-search-icon" style={{ color: 'gray' }} />
            <input
              type="text"
              placeholder="Search courses, materials, instructors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="header-search-input"
              style={{ color: 'white' }}
            />
          </motion.div>
        </div>

        <div className="header-right-section">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="header-notification-button"
            style={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          >
            <Bell className="w-5 h-5" />
            <span className="header-notification-badge" style={{ backgroundColor: '#dc2626' }}></span>
          </motion.button>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="relative"
          >
            <div
              className="header-profile-info group cursor-pointer"
              onClick={() => setHeaderMenuOpen(!headerMenuOpen)}
              style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
            >
              <div className="header-profile-avatar-bg group-hover:shadow-xl" style={{ background: 'linear-gradient(to bottom right, #dc2626, #1d4ed8)' }}>
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="header-profile-text-container md:block">
                <p className="header-profile-name" style={{ color: 'white' }}>{officer?.name || "Officer"}</p>
                <p className="header-profile-status" style={{ color: 'gray' }}>online</p>
              </div>
            </div>

            {headerMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-40 bg-gray-900 shadow-lg rounded-md overflow-hidden z-20 border border-gray-700"
              >
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-800 flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" /> Logout
                </button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

// Dashboard Component
const Dashboard = ({ officer }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="dashboard-container"
  >
    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="dashboard-header"
    >
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="dashboard-title"
          style={{ color: 'white' }}
        >
          Welcome back, {officer?.rank || "Officer"} {officer?.name || ""} 👋
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="dashboard-subtitle"
          style={{ color: 'gray' }}
        >
          Continue your learning journey and achieve your goals
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
        className="dashboard-last-login"
      >
        <p className="dashboard-last-login-label" style={{ color: 'gray' }}>Last login</p>
        <p className="dashboard-last-login-time" style={{ color: 'white' }}>Today, 09:30 AM</p>
      </motion.div>
    </motion.div>

    {/* Stats Section */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="dashboard-stats-grid"
    >
      <StatCard
        title="Enrolled Programs"
        value="3"
        icon={BookOpen}
        color="from-blue-500 to-blue-600"
        change="+1 this month"
        delay={0.6}
      />
      <StatCard
        title="Completed"
        value="1"
        icon={CheckCircle}
        color="from-green-500 to-green-600"
        change="In progress"
        delay={0.7}
      />
      <StatCard
        title="Hours Learned"
        value="42"
        icon={Clock}
        color="from-amber-500 to-orange-600"
        change="+5 this week"
        delay={0.8}
      />
      <StatCard
        title="Avg. Rating"
        value="4.5"
        icon={Star}
        color="from-purple-500 to-pink-600"
        change="Good"
        delay={0.9}
      />
    </motion.div>

    {/* Deadlines + Streak */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 }}
      className="dashboard-main-content-grid"
    >
      {/* Deadlines */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3 }}
        className="dashboard-deadlines-streak-section"
      >
        <div className="dashboard-card-base" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
          <div className="dashboard-deadlines-card-header">
            <h2 className="dashboard-card-title" style={{ color: 'white' }}>Upcoming Deadlines</h2>
          </div>
          <div className="dashboard-deadlines-card-body">
            <div className="dashboard-deadline-item" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <div className="dashboard-deadline-item-content">
                <div className="dashboard-deadline-icon-bg" style={{ background: 'linear-gradient(to bottom right, #dc2626, #1d4ed8)' }}>
                  <Calendar className="dashboard-deadline-icon" style={{ color: 'white' }} />
                </div>
                <div className="dashboard-deadline-details">
                  <h3 className="dashboard-deadline-title" style={{ color: 'white' }}>
                    CCTNS Final Assessment
                  </h3>
                  <p className="dashboard-deadline-date" style={{ color: 'gray' }}>
                    Due: Feb 15, 2024
                  </p>
                  <div className="dashboard-deadline-footer">
                    <span className="dashboard-deadline-days-left" style={{ color: '#fbbf24' }}>
                      2 days left
                    </span>
                    <button className="dashboard-deadline-button" style={{ background: 'linear-gradient(to right, #dc2626, #1d4ed8)', color: 'white' }}>
                      Start Now
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="dashboard-deadline-item" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <div className="dashboard-deadline-item-content">
                <div className="dashboard-deadline-icon-bg" style={{ background: 'linear-gradient(to bottom right, #dc2626, #1d4ed8)' }}>
                  <Trophy className="dashboard-deadline-icon" style={{ color: 'white' }} />
                </div>
                <div className="dashboard-deadline-details">
                  <h3 className="dashboard-deadline-title" style={{ color: 'white' }}>
                    Khoj App Quiz
                  </h3>
                  <p className="dashboard-deadline-date" style={{ color: 'gray' }}>
                    Due: Feb 20, 2024
                  </p>
                  <div className="dashboard-deadline-footer">
                    <span className="dashboard-deadline-days-left" style={{ color: '#fbbf24' }}>
                      7 days left
                    </span>
                    <button className="dashboard-deadline-button" style={{ background: 'linear-gradient(to right, #dc2626, #1d4ed8)', color: 'white' }}>
                      Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Learning Streak */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4 }}
          className="dashboard-learning-streak-card"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
        >
          <h3 className="dashboard-learning-streak-title" style={{ color: 'white' }}>Learning Streak</h3>
          <p className="dashboard-learning-streak-text" style={{ color: 'gray' }}>
            You've learned for 7 days in a row!
          </p>
          <div className="dashboard-learning-streak-days">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <motion.div
                key={day}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5 + day * 0.1 }}
                className="dashboard-learning-streak-day-item"
                style={{ background: 'linear-gradient(to bottom right, #dc2626, #1d4ed8)' }}
              >
                <CheckCircle className="dashboard-learning-streak-day-icon" style={{ color: 'white' }} />
              </motion.div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="dashboard-learning-streak-button"
            style={{ background: 'linear-gradient(to right, #dc2626, #1d4ed8)', color: 'white' }}
          >
            Keep Going
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  </motion.div>
);

// Officer Details Component
const OfficerDetails = ({ officer }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="officer-details-container"
  >
    <h1 className="officer-details-title" style={{ color: 'white' }}>Officer Details</h1>

    <form className="officer-details-form" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
      <div className="form-group">
        <label style={{ color: 'gray' }}>Name</label>
        <input type="text" value={officer?.name || ""} readOnly style={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
      </div>

      <div className="form-group">
        <label style={{ color: 'gray' }}>Rank</label>
        <input type="text" value={officer?.rank || ""} readOnly style={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
      </div>

      <div className="form-group">
        <label style={{ color: 'gray' }}>Belt No</label>
        <input type="text" value={officer?.belt || ""} readOnly style={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
      </div>

      <div className="form-group">
        <label style={{ color: 'gray' }}>Email</label>
        <input type="text" value={officer?.email || ""} readOnly style={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
      </div>

      <div className="form-group">
        <label style={{ color: 'gray' }}>Mobile</label>
        <input type="text" value={officer?.mobile || ""} readOnly style={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
      </div>

      <div className="form-group">
        <label style={{ color: 'gray' }}>District</label>
        <input type="text" value={officer?.district || ""} readOnly style={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
      </div>

      <div className="form-group">
        <label style={{ color: 'gray' }}>Police Station</label>
        <input type="text" value={officer?.policeStation || ""} readOnly style={{ color: 'white', backgroundColor: 'rgba(255, 255, 255, 0.05)' }} />
      </div>
    </form>
  </motion.div>
);

// Calendar Component
const CalendarView = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="calendar-container"
  >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="calendar-header"
    >
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="calendar-title"
          style={{ color: 'white' }}
        >
          Learning Calendar
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="calendar-subtitle"
          style={{ color: 'gray' }}
        >
          Plan your learning schedule and track deadlines
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="calendar-buttons"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="calendar-button"
          style={{ background: 'linear-gradient(to right, #dc2626, #1d4ed8)', color: 'white' }}
        >
          Today
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="calendar-button"
          style={{ background: 'linear-gradient(to right, #dc2626, #1d4ed8)', color: 'white' }}
        >
          This Week
        </motion.button>
      </motion.div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="calendar-main-card"
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.2)' }}
    >
      <div className="calendar-grid-container">
        <div className="calendar-month-view">
          <div className="mb-8">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="calendar-month-title"
              style={{ color: 'white' }}
            >
              February 2024
            </motion.h2>
            <div className="calendar-weekdays-grid">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="calendar-weekday-item"
                  style={{ color: 'gray' }}
                >
                  {day}
                </motion.div>
              ))}
            </div>
            <div className="calendar-days-grid">
              {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                <motion.div
                  key={day}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + day * 0.02 }}
                  className={`calendar-day-item ${
                    day === 15 
                      ? 'calendar-day-item-selected' 
                      : 'calendar-day-item-default'
                  }`}
                  style={{ 
                    backgroundColor: day === 15 ? 'rgba(251, 191, 36, 0.2)' : 'transparent',
                    color: day === 15 ? '#fbbf24' : 'white',
                    border: '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  {day}
                  {day === 15 && (
                    <div className="calendar-event-dot" style={{ backgroundColor: '#dc2626' }}></div>
                  )}
                  {day === 20 && (
                    <div className="calendar-event-dot" style={{ backgroundColor: '#f59e0b' }}></div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
        
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="calendar-upcoming-events-section"
        >
          <h3 className="calendar-upcoming-events-title" style={{ color: 'white' }}>Upcoming Events</h3>
          <div className="calendar-event-list">
            <div className="calendar-event-item" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <div className="calendar-event-item-content">
                <div className="calendar-event-icon-bg" style={{ background: 'linear-gradient(to bottom right, #dc2626, #1d4ed8)' }}>
                  <Calendar className="calendar-event-icon" style={{ color: 'white' }} />
                </div>
                <div className="calendar-event-details">
                  <h4 className="calendar-event-title" style={{ color: 'white' }}>CCTNS Final Assessment</h4>
                  <p className="calendar-event-date-time" style={{ color: 'gray' }}>Feb 15, 2024 • 10:00 AM</p>
                  <div className="calendar-event-footer">
                    <span className="calendar-event-days-left" style={{ color: '#fbbf24' }}>2 days left</span>
                    <button className="calendar-event-button" style={{ background: 'linear-gradient(to right, #dc2626, #1d4ed8)', color: 'white' }}>
                      Prepare
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="calendar-event-item" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <div className="calendar-event-item-content">
                <div className="calendar-event-icon-bg" style={{ background: 'linear-gradient(to bottom right, #dc2626, #1d4ed8)' }}>
                  <Trophy className="calendar-event-icon" style={{ color: 'white' }} />
                </div>
                <div className="calendar-event-details">
                  <h4 className="calendar-event-title" style={{ color: 'white' }}>Khoj App Quiz</h4>
                  <p className="calendar-event-date-time" style={{ color: 'gray' }}>Feb 20, 2024 • 2:00 PM</p>
                  <div className="calendar-event-footer">
                    <span className="calendar-event-days-left" style={{ color: '#fbbf24' }}>7 days left</span>
                    <button className="calendar-event-button" style={{ background: 'linear-gradient(to right, #dc2626, #1d4ed8)', color: 'white' }}>
                      Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="calendar-event-item" style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}>
              <div className="calendar-event-item-content">
                <div className="calendar-event-icon-bg" style={{ background: 'linear-gradient(to bottom right, #dc2626, #1d4ed8)' }}>
                  <BookOpen className="calendar-event-icon" style={{ color: 'white' }} />
                </div>
                <div className="calendar-event-details">
                  <h4 className="calendar-event-title" style={{ color: 'white' }}>New Criminal Law Module 5</h4>
                  <p className="calendar-event-date-time" style={{ color: 'gray' }}>Feb 25, 2024 • 3:00 PM</p>
                  <div className="calendar-event-footer">
                    <span className="calendar-event-days-left" style={{ color: '#fbbf24' }}>12 days left</span>
                    <button className="calendar-event-button" style={{ background: 'linear-gradient(to right, #dc2626, #1d4ed8)', color: 'white' }}>
                      Preview
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  </motion.div>
);

// Achievements Component
const Achievements = () => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="achievements-container">
    <h1 className="achievements-title" style={{ color: 'white' }}>Achievements</h1>
    <p className="achievements-subtitle" style={{ color: 'gray' }}>Your earned awards will appear here.</p>
  </motion.div>
);

// Main App Component
const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [officer, setOfficer] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    const userData = localStorage.getItem("user");
    if (userData) {
      setOfficer(JSON.parse(userData));
    }
    return () => clearTimeout(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard officer={officer} />;
      case 'officer-details': return <OfficerDetails officer={officer} />;
      case 'calendar': return <CalendarView />;
      case 'achievements': return <Achievements />;
      default: return <Dashboard />;
    }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="app-container flex h-screen relative min-h-screen bg-black overflow-hidden">
      {/* Neon Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-700 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-700 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-red-700 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-pulse delay-2000"></div>
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

      <div className="relative z-10 flex h-full w-full">
        <AnimatePresence>
          {(sidebarOpen || window.innerWidth >= 1024) && (
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              setSidebarOpen={setSidebarOpen}
              officer={officer}
              handleLogout={handleLogout}
            />
          )}
        </AnimatePresence>

        {/* Main area: header + content */}
        <div className="main-area flex-1 flex flex-col">
          {/* Header (only inside main area) */}
          <Header
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setSidebarOpen={setSidebarOpen}
            officer={officer}
            handleLogout={handleLogout}
          />

          {/* Content */}
          <main className="main-content flex-1 overflow-y-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;