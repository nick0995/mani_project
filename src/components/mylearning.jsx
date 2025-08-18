import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Video, FileText, Trophy, Users, Calendar, Search, Bell, User, Play, Download, Clock, CheckCircle, Menu, X, ChevronRight, Star, Award, Target, GraduationCap, Book } from 'lucide-react';
import './styles/mylearning.css';
// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="loading-spinner-container">
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        duration: 0.8
      }}
      className="loading-spinner-content"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="loading-spinner-icon-wrapper"
      >
        <GraduationCap className="loading-spinner-icon" />
      </motion.div>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="loading-spinner-title"
      >
        LawTrain
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="loading-spinner-text"
      >
        Preparing your learning experience...
      </motion.p>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "200px" }}
        transition={{ delay: 1, duration: 1.5 }}
        className="loading-spinner-progress-bar-background"
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 1.2, duration: 1.2 }}
          className="loading-spinner-progress-bar-fill"
        />
      </motion.div>
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
  >
    <div className={`absolute inset-0 stat-card-gradient-overlay-${color.split('-')[1]}`}></div>
    <div className="stat-card-content">
      <div className="stat-card-header">
        <div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.2 }}
            className="stat-card-title"
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
          >
            {value}
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.4 }}
            className="stat-card-change"
          >
            {change}
          </motion.p>
        </div>
        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
          className={`stat-card-icon-wrapper stat-card-icon-wrapper-${color.split('-')[1]}`}
        >
          <Icon className="stat-card-icon" />
        </motion.div>
      </div>
    </div>
  </motion.div>
);

// Course Card Component
const CourseCard = ({ course, index, onClick }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
    whileHover={{ y: -10, transition: { duration: 0.3 } }}
    className="course-card group"
    onClick={onClick}
  >
    <div className="course-card-image-wrapper">
      <motion.img 
        src={course.image} 
        alt={course.title}
        className="course-card-image group-hover:scale-110"
        whileHover={{ scale: 1.05 }}
      />
      <div className={`absolute inset-0 course-card-image-overlay-${course.color.split('-')[1]}`}></div>
      <div className="absolute top-4 right-4">
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.4 }}
          className="course-card-category"
        >
          {course.category}
        </motion.span>
      </div>
      <div className="course-card-rating">
        <Star className="course-card-rating-icon" />
        <span className="course-card-rating-value">{course.rating}</span>
      </div>
    </div>
    <div className="course-card-body">
      <motion.h3 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 + 0.5 }}
        className="course-card-title group-hover:text-indigo-600"
      >
        {course.title}
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.1 + 0.6 }}
        className="course-card-description"
      >
        {course.description}
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.7 }}
        className="course-card-meta"
      >
        <div className="course-card-meta-item">
          <Clock className="course-card-meta-icon" />
          <span>{course.duration}</span>
        </div>
        <div className="course-card-meta-item">
          <Users className="course-card-meta-icon" />
          <span>{course.students.toLocaleString()}</span>
        </div>
        <div className="course-card-meta-item">
          <Book className="course-card-meta-icon" />
          <span>{course.modules} modules</span>
        </div>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: index * 0.1 + 0.8 }}
        className="course-card-progress-section"
      >
        <div className="course-card-progress-header">
          <span className="course-card-progress-label">Progress</span>
          <span className="course-card-progress-value">{course.progress}%</span>
        </div>
        <div className="course-card-progress-bar-background">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${course.progress}%` }}
            transition={{ delay: index * 0.1 + 1, duration: 1 }}
            className={`course-card-progress-bar-fill course-card-progress-bar-fill-${course.color.split('-')[1]}`}
          />
        </div>
      </motion.div>
      
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`course-card-button ${
          course.progress > 0
            ? 'continue'
            : 'enroll'
        }`}
      >
        {course.progress > 0 ? 'Continue Learning' : 'Enroll Now'}
      </motion.button>
    </div>
  </motion.div>
);

// Sidebar Component
const Sidebar = ({ activeTab, setActiveTab, setSelectedCourse, setSidebarOpen }) => (
  <motion.div
    initial={{ x: -300 }}
    animate={{ x: 0 }}
    exit={{ x: -300 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="sidebar-container lg:translate-x-0 lg:static lg:inset-0"
  >
    <div className="sidebar-header">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="sidebar-logo-wrapper"
      >
        <div className="sidebar-logo-icon-bg">
          <GraduationCap className="sidebar-logo-icon" />
        </div>
        <div>
          <span className="sidebar-logo-text">LawTrain</span>
          <p className="sidebar-logo-subtext">Professional Training</p>
        </div>
      </motion.div>
      <button
        onClick={() => setSidebarOpen(false)}
        className="sidebar-close-button lg:hidden"
      >
        <X className="w-6 h-6" />
      </button>
    </div>
    
    <nav className="sidebar-nav">
      {[
        { id: 'dashboard', label: 'Dashboard', icon: Target },
        { id: 'courses', label: 'All Courses', icon: BookOpen },
        { id: 'my-courses', label: 'My Learning', icon: Book },
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
            setSelectedCourse(null);
            setSidebarOpen(false);
          }}
          className={`sidebar-nav-button ${
            activeTab === item.id
              ? 'sidebar-nav-button-active'
              : 'sidebar-nav-button-inactive'
          }`}
        >
          <item.icon className="sidebar-nav-icon" />
          <span className="sidebar-nav-label">{item.label}</span>
          {activeTab === item.id && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="sidebar-nav-active-dot"
            />
          )}
        </motion.button>
      ))}
    </nav>

    <div className="sidebar-profile-section">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="sidebar-profile-card"
      >
        <div className="sidebar-profile-info">
          <div className="sidebar-profile-avatar-bg">
            <User className="sidebar-profile-avatar-icon" />
          </div>
          <div>
            <p className="sidebar-profile-name">Inspector Singh</p>
            <p className="sidebar-profile-academy">Police Academy</p>
          </div>
        </div>
      </motion.div>
    </div>
  </motion.div>
);

// Header Component
const Header = ({ searchQuery, setSearchQuery, setSidebarOpen }) => (
  <motion.header
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
    className="header-container"
  >
    <div className="header-content">
      <div className="header-left-section">
        <button
          onClick={() => setSidebarOpen(true)}
          className="header-menu-button lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="header-search-wrapper group"
        >
          <div className="header-search-wrapper-gradient-blur group-hover:opacity-30"></div>
          <Search className="header-search-icon" />
          <input
            type="text"
            placeholder="Search courses, materials, instructors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="header-search-input"
          />
        </motion.div>
      </div>
      
      <div className="header-right-section">
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="header-notification-button"
        >
          <Bell className="w-5 h-5" />
          <span className="header-notification-badge"></span>
        </motion.button>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="header-profile-info group"
        >
          <div className="header-profile-avatar-bg group-hover:shadow-xl">
            <User className="w-5 h-5 text-white" />
          </div>
          <div className="header-profile-text-container md:block">
            <p className="header-profile-name">Inspector Singh</p>
            <p className="header-profile-status">Online</p>
          </div>
        </motion.div>
      </div>
    </div>
  </motion.header>
);

// Dashboard Component
const Dashboard = ({ courses, setSelectedCourse }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="dashboard-container"
  >
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
        >
          Welcome back, Inspector Singh 👋
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="dashboard-subtitle"
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
        <p className="dashboard-last-login-label">Last login</p>
        <p className="dashboard-last-login-time">Today, 09:30 AM</p>
      </motion.div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="dashboard-stats-grid"
    >
      <StatCard
        title="Enrolled Courses"
        value="4"
        icon={BookOpen}
        color="from-blue-500 to-blue-600"
        change="+1 this month"
        delay={0.6}
      />
      <StatCard
        title="Completed"
        value="2"
        icon={CheckCircle}
        color="from-green-500 to-green-600"
        change="50% progress"
        delay={0.7}
      />
      <StatCard
        title="Hours Learned"
        value="89"
        icon={Clock}
        color="from-amber-500 to-orange-600"
        change="+12 this week"
        delay={0.8}
      />
      <StatCard
        title="Avg. Rating"
        value="4.7"
        icon={Star}
        color="from-purple-500 to-pink-600"
        change="Excellent"
        delay={0.9}
      />
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 }}
      className="dashboard-main-content-grid"
    >
      <div className="dashboard-continue-learning-section">
        <div className="dashboard-card-base">
          <div className="dashboard-card-header">
            <div className="dashboard-card-header-content">
              <h2 className="dashboard-card-title">Continue Learning</h2>
              <button className="dashboard-card-view-all-button">View All</button>
            </div>
          </div>
          <div className="dashboard-card-body">
            {courses.slice(0, 2).map((course, index) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="dashboard-course-item group"
                onClick={() => setSelectedCourse(course)}
              >
                <div className="dashboard-course-item-image-wrapper">
                  <img src={course.image} alt={course.title} className="dashboard-course-item-image" />
                  <div className="dashboard-course-item-play-overlay group-hover:opacity-100">
                    <Play className="dashboard-course-item-play-icon" />
                  </div>
                </div>
                <div className="dashboard-course-item-details">
                  <h3 className="dashboard-course-item-title group-hover:text-indigo-600">{course.title}</h3>
                  <p className="dashboard-course-item-instructor">{course.instructor}</p>
                  <div className="dashboard-course-item-progress-wrapper">
                    <div className="dashboard-course-item-progress-bar-background">
                      <div 
                        className={`dashboard-course-item-progress-bar-fill course-card-progress-bar-fill-${course.color.split('-')[1]}`}
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                    <span className="dashboard-course-item-progress-value">{course.progress}%</span>
                  </div>
                </div>
                <ChevronRight className="dashboard-course-item-arrow-icon group-hover:text-indigo-600" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.3 }}
        className="dashboard-deadlines-streak-section"
      >
        <div className="dashboard-card-base">
          <div className="dashboard-deadlines-card-header">
            <h2 className="dashboard-card-title">Upcoming Deadlines</h2>
          </div>
          <div className="dashboard-deadlines-card-body">
            <div className="dashboard-deadline-item dashboard-deadline-item-red">
              <div className="dashboard-deadline-item-content">
                <div className="dashboard-deadline-icon-bg dashboard-deadline-icon-bg-red">
                  <Calendar className="dashboard-deadline-icon" />
                </div>
                <div className="dashboard-deadline-details">
                  <h3 className="dashboard-deadline-title dashboard-deadline-title-red">CCTNS Final Assessment</h3>
                  <p className="dashboard-deadline-date dashboard-deadline-date-red">Due: Feb 15, 2024</p>
                  <div className="dashboard-deadline-footer">
                    <span className="dashboard-deadline-days-left dashboard-deadline-days-left-red">2 days left</span>
                    <button className="dashboard-deadline-button dashboard-deadline-button-red">
                      Start Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="dashboard-deadline-item dashboard-deadline-item-amber">
              <div className="dashboard-deadline-item-content">
                <div className="dashboard-deadline-icon-bg dashboard-deadline-icon-bg-amber">
                  <Trophy className="dashboard-deadline-icon" />
                </div>
                <div className="dashboard-deadline-details">
                  <h3 className="dashboard-deadline-title dashboard-deadline-title-amber">Khoj App Quiz</h3>
                  <p className="dashboard-deadline-date dashboard-deadline-date-amber">Due: Feb 20, 2024</p>
                  <div className="dashboard-deadline-footer">
                    <span className="dashboard-deadline-days-left dashboard-deadline-days-left-amber">7 days left</span>
                    <button className="dashboard-deadline-button dashboard-deadline-button-amber">
                      Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4 }}
          className="dashboard-learning-streak-card"
        >
          <h3 className="dashboard-learning-streak-title">Learning Streak</h3>
          <p className="dashboard-learning-streak-text">You've learned for 7 days in a row!</p>
          <div className="dashboard-learning-streak-days">
            {[1, 2, 3, 4, 5, 6, 7].map((day) => (
              <motion.div
                key={day}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5 + day * 0.1 }}
                className="dashboard-learning-streak-day-item"
              >
                <CheckCircle className="dashboard-learning-streak-day-icon" />
              </motion.div>
            ))}
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="dashboard-learning-streak-button"
          >
            Keep Going
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  </motion.div>
);

// Course Detail Component
const CourseDetail = ({ course, activeCourseTab, setActiveCourseTab, setSelectedCourse }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="course-detail-container"
  >
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="course-detail-back-button group"
    >
      <button
        onClick={() => setSelectedCourse(null)}
        className="flex items-center space-x-2 text-indigo-600 hover:text-indigo-700 font-semibold transition-colors group"
      >
        <div className="course-detail-back-button-icon-bg group-hover:bg-indigo-200">
          <ChevronRight className="course-detail-back-button-icon" />
        </div>
        <span>Back to Courses</span>
      </button>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="course-detail-card"
    >
      <div className="course-detail-hero-section">
        <img src={course.image} alt={course.title} className="course-detail-hero-image" />
        <div className="course-detail-hero-overlay"></div>
        <div className="course-detail-hero-content">
          <div className="course-detail-hero-content-inner">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="course-detail-hero-badges"
            >
              <span className="course-detail-hero-badge">
                {course.category}
              </span>
              <div className="course-detail-hero-rating">
                <Star className="course-detail-hero-rating-icon" />
                <span className="course-detail-hero-rating-value">{course.rating}</span>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="course-detail-hero-title"
            >
              {course.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="course-detail-hero-description"
            >
              {course.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="course-detail-hero-meta"
            >
              <div className="course-detail-hero-meta-item">
                <Users className="course-detail-hero-meta-icon" />
                <span>{course.students} students</span>
              </div>
              <div className="course-detail-hero-meta-item">
                <Clock className="course-detail-hero-meta-icon" />
                <span>{course.duration}</span>
              </div>
              <div className="course-detail-hero-meta-item">
                <Book className="course-detail-hero-meta-icon" />
                <span>{course.modules} modules</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="course-detail-body">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="course-detail-progress-section"
        >
          <div className="course-detail-progress-header">
            <span className="course-detail-progress-label">Your Progress</span>
            <span className="course-detail-progress-value">{course.progress}%</span>
          </div>
          <div className="course-detail-progress-bar-background">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${course.progress}%` }}
              transition={{ duration: 1, delay: 0.8 }}
              className={`course-detail-progress-bar-fill course-card-progress-bar-fill-${course.color.split('-')[1]}`}
            ></motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="course-detail-tabs-container"
        >
          <nav className="course-detail-tabs-nav">
            {[
              { id: 'videos', label: 'Video Lectures', icon: Video, count: 4 },
              { id: 'materials', label: 'Study Materials', icon: FileText, count: 4 },
              { id: 'quizzes', label: 'Quizzes', icon: Trophy, count: 3 },
              { id: 'assessments', label: 'Assessments', icon: CheckCircle, count: 3 }
            ].map((tab, index) => (
              <motion.button
                key={tab.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 + index * 0.1 }}
                onClick={() => setActiveCourseTab(tab.id)}
                className={`course-detail-tab-button ${
                  activeCourseTab === tab.id
                    ? `course-detail-tab-button-active`
                    : 'course-detail-tab-button-inactive'
                }`}
              >
                <tab.icon className="course-detail-tab-icon" />
                <span>{tab.label}</span>
                <span className={`course-detail-tab-count ${
                  activeCourseTab === tab.id 
                    ? 'course-detail-tab-count-active' 
                    : 'course-detail-tab-count-inactive'
                }`}>
                  {tab.count}
                </span>
              </motion.button>
            ))}
          </nav>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="course-detail-tab-content"
        >
          {activeCourseTab === 'videos' && (
            <div className="video-lectures-section">
              <h3 className="video-lectures-title">Video Lectures</h3>
              <div className="video-lectures-grid">
                {[
                  { id: 1, title: 'Introduction to ICJS Framework', duration: '15:30', watched: true, thumbnail: 'https://placehold.co/120x80/6366f1/ffffff?text=Intro' },
                  { id: 2, title: 'Digital Evidence Collection', duration: '22:15', watched: true, thumbnail: 'https://placehold.co/120x80/8b5cf6/ffffff?text=Evidence' },
                  { id: 3, title: 'Cyber Crime Investigation Process', duration: '18:45', watched: false, thumbnail: 'https://placehold.co/120x80/06b6d4/ffffff?text=Process' },
                  { id: 4, title: 'Legal Procedures in Cyber Cases', duration: '25:10', watched: false, thumbnail: 'https://placehold.co/120x80/10b981/ffffff?text=Legal' }
                ].map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                    className="video-card"
                  >
                    <div className="video-card-thumbnail-wrapper">
                      <img src={video.thumbnail} alt={video.title} className="video-card-thumbnail" />
                      <div className="video-card-play-overlay">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="video-card-play-button"
                        >
                          <Play className="video-card-play-icon" />
                        </motion.div>
                      </div>
                      {video.watched && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 1.5 + index * 0.1 }}
                          className="video-card-watched-badge"
                        >
                          <CheckCircle className="video-card-watched-icon" />
                        </motion.div>
                      )}
                      <div className="video-card-duration">
                        {video.duration}
                      </div>
                    </div>
                    <div className="video-card-body">
                      <h4 className="video-card-title">{video.title}</h4>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`video-card-button ${
                          video.watched 
                            ? 'watched' 
                            : 'unwatched'
                        }`}
                      >
                        {video.watched ? 'Replay' : 'Start Learning'}
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeCourseTab === 'materials' && (
            <div className="study-materials-section">
              <h3 className="study-materials-title">Study Materials</h3>
              <div className="study-materials-grid">
                {[
                  { id: 1, title: 'ICJS Implementation Guidelines', type: 'PDF', size: '2.4 MB', icon: '📄' },
                  { id: 2, title: 'Case Studies in Cyber Justice', type: 'PDF', size: '1.8 MB', icon: '📚' },
                  { id: 3, title: 'Digital Forensics Handbook', type: 'DOC', size: '3.2 MB', icon: '📑' },
                  { id: 4, title: 'Legal Reference Materials', type: 'PDF', size: '4.1 MB', icon: '⚖️' }
                ].map((material, index) => (
                  <motion.div
                    key={material.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                    className="material-card"
                  >
                    <div className="material-card-icon">{material.icon}</div>
                    <div className="material-card-details">
                      <h4 className="material-card-title">{material.title}</h4>
                      <div className="material-card-meta">
                        <span>{material.type}</span>
                        <span>•</span>
                        <span>{material.size}</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="material-card-download-button"
                    >
                      <Download className="w-5 h-5" />
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeCourseTab === 'quizzes' && (
            <div className="quizzes-section">
              <h3 className="quizzes-title">Quizzes & Tests</h3>
              <div className="quiz-card-list">
                {[
                  { id: 1, title: 'Module 1 Assessment', questions: 20, completed: true, score: 85, icon: '📝' },
                  { id: 2, title: 'Module 2 Quiz', questions: 15, completed: false, score: null, icon: '✏️' },
                  { id: 3, title: 'Mid-term Evaluation', questions: 30, completed: false, score: null, icon: '📊' }
                ].map((quiz, index) => (
                  <motion.div
                    key={quiz.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                    className="quiz-card"
                  >
                    <div className="quiz-card-content">
                      <div className="quiz-card-icon">{quiz.icon}</div>
                      <div className="quiz-card-details">
                        <h4 className="quiz-card-title">{quiz.title}</h4>
                        <p className="quiz-card-questions">{quiz.questions} questions</p>
                        {quiz.completed && (
                          <div className="quiz-card-completed-info">
                            <div className="quiz-card-completed-icon-bg">
                              <CheckCircle className="quiz-card-completed-icon" />
                            </div>
                            <span className="quiz-card-score">{quiz.score}% Score</span>
                          </div>
                        )}
                      </div>
                      <div className="quiz-card-actions">
                        {quiz.completed ? (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="quiz-card-button review"
                          >
                            Review
                          </motion.button>
                        ) : (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="quiz-card-button start"
                          >
                            Start Quiz
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeCourseTab === 'assessments' && (
            <div className="assessments-section">
              <h3 className="assessments-title">Assessments</h3>
              <div className="assessment-card-list">
                {[
                  { id: 1, title: 'Mid-term Practical Assessment', type: 'Practical', dueDate: '2024-02-15', status: 'pending', icon: '🎯' },
                  { id: 2, title: 'Final Theory Exam', type: 'Theory', dueDate: '2024-03-20', status: 'scheduled', icon: '🎓' },
                  { id: 3, title: 'Project Submission', type: 'Project', dueDate: '2024-04-05', status: 'scheduled', icon: '📋' }
                ].map((assessment, index) => (
                  <motion.div
                    key={assessment.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                    className="assessment-card"
                  >
                    <div className="assessment-card-content">
                      <div className="assessment-card-icon">{assessment.icon}</div>
                      <div className="assessment-card-details">
                        <h4 className="assessment-card-title">{assessment.title}</h4>
                        <div className="assessment-card-meta">
                          <span className="assessment-card-type-badge">{assessment.type}</span>
                          <span className="assessment-card-due-date">Due: {assessment.dueDate}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`assessment-card-status ${
                          assessment.status === 'pending' 
                            ? 'assessment-card-status-pending' 
                            : assessment.status === 'scheduled'
                            ? 'assessment-card-status-scheduled'
                            : 'assessment-card-status-completed'
                        }`}>
                          {assessment.status.charAt(0).toUpperCase() + assessment.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  </motion.div>
);

// Courses Component
const Courses = ({ courses, setSelectedCourse, searchQuery }) => {
  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    course.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="courses-container"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="courses-header"
      >
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="courses-title"
          >
            All Courses
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="courses-subtitle"
          >
            Explore our comprehensive training programs
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="courses-filters"
        >
          <select className="courses-filter-select">
            <option>All Categories</option>
            <option>Cyber Law</option>
            <option>Investigation</option>
            <option>Mobile Technology</option>
            <option>Legal Studies</option>
          </select>
          <select className="courses-filter-select">
            <option>Sort by: Popularity</option>
            <option>Sort by: Newest</option>
            <option>Sort by: Rating</option>
          </select>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="courses-grid"
      >
        {filteredCourses.map((course, index) => (
          <CourseCard 
            key={course.id} 
            course={course} 
            index={index} 
            onClick={() => setSelectedCourse(course)} 
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

// My Courses Component
const MyCourses = ({ courses, setSelectedCourse }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="my-courses-container"
  >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="my-courses-header"
    >
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="my-courses-title"
        >
          My Learning Path
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="my-courses-subtitle"
        >
          Track your progress and continue your education
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="my-courses-active-count"
      >
        <p className="my-courses-active-value">{courses.filter(c => c.progress > 0).length}</p>
        <p className="my-courses-active-label">Active Courses</p>
      </motion.div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="my-courses-grid"
    >
      {courses.filter(c => c.progress > 0).map((course, index) => (
        <motion.div
          key={course.id}
          initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
          className="my-course-card group"
          onClick={() => setSelectedCourse(course)}
        >
          <div className="my-course-card-inner">
            <div className="my-course-card-image-wrapper">
              <img src={course.image} alt={course.title} className="my-course-card-image" />
              <div className={`absolute inset-0 my-course-card-image-overlay-${course.color.split('-')[1]}`}></div>
            </div>
            <div className="my-course-card-body">
              <div className="my-course-card-header-info">
                <span className="my-course-card-category-badge">
                  {course.category}
                </span>
                <div className="my-course-card-rating">
                  <Star className="my-course-card-rating-icon" />
                  <span className="my-course-card-rating-value">{course.rating}</span>
                </div>
              </div>
              <h3 className="my-course-card-title group-hover:text-indigo-600">{course.title}</h3>
              <p className="my-course-card-instructor">by {course.instructor}</p>
              
              <div className="my-course-card-progress-section">
                <div className="my-course-card-progress-header">
                  <span className="my-course-card-progress-label">Progress</span>
                  <span className="my-course-card-progress-value">{course.progress}%</span>
                </div>
                <div className="my-course-card-progress-bar-background">
                  <div 
                    className={`my-course-card-progress-bar-fill my-course-card-progress-bar-fill-${course.color.split('-')[1]}`}
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>
              
              <motion.button
                whileHover={{ x: 5 }}
                className="my-course-card-continue-button group"
              >
                <span>Continue Learning</span>
                <ChevronRight className="my-course-card-continue-button-icon group-hover:translate-x-1" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
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
        >
          Learning Calendar
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="calendar-subtitle"
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
          className="calendar-button today"
        >
          Today
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="calendar-button this-week"
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
    >
      <div className="calendar-grid-container">
        <div className="calendar-month-view">
          <div className="mb-8">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="calendar-month-title"
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
                >
                  {day}
                  {day === 15 && (
                    <div className="calendar-event-dot-red"></div>
                  )}
                  {day === 20 && (
                    <div className="calendar-event-dot-amber"></div>
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
          <h3 className="calendar-upcoming-events-title">Upcoming Events</h3>
          <div className="calendar-event-list">
            <div className="calendar-event-item calendar-event-item-red">
              <div className="calendar-event-item-content">
                <div className="calendar-event-icon-bg calendar-event-icon-bg-red">
                  <Calendar className="calendar-event-icon" />
                </div>
                <div className="calendar-event-details">
                  <h4 className="calendar-event-title calendar-event-title-red">CCTNS Final Assessment</h4>
                  <p className="calendar-event-date-time calendar-event-date-time-red">Feb 15, 2024 • 10:00 AM</p>
                  <div className="calendar-event-footer">
                    <span className="calendar-event-days-left calendar-event-days-left-red">2 days left</span>
                    <button className="calendar-event-button calendar-event-button-red">
                      Prepare
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="calendar-event-item calendar-event-item-amber">
              <div className="calendar-event-item-content">
                <div className="calendar-event-icon-bg calendar-event-icon-bg-amber">
                  <Trophy className="calendar-event-icon" />
                </div>
                <div className="calendar-event-details">
                  <h4 className="calendar-event-title calendar-event-title-amber">Khoj App Quiz</h4>
                  <p className="calendar-event-date-time calendar-event-date-time-amber">Feb 20, 2024 • 2:00 PM</p>
                  <div className="calendar-event-footer">
                    <span className="calendar-event-days-left calendar-event-days-left-amber">7 days left</span>
                    <button className="calendar-event-button calendar-event-button-amber">
                      Review
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="calendar-event-item calendar-event-item-green">
              <div className="calendar-event-item-content">
                <div className="calendar-event-icon-bg calendar-event-icon-bg-green">
                  <BookOpen className="calendar-event-icon" />
                </div>
                <div className="calendar-event-details">
                  <h4 className="calendar-event-title calendar-event-title-green">New Criminal Law Module 5</h4>
                  <p className="calendar-event-date-time calendar-event-date-time-green">Feb 25, 2024 • 3:00 PM</p>
                  <div className="calendar-event-footer">
                    <span className="calendar-event-days-left calendar-event-days-left-green">12 days left</span>
                    <button className="calendar-event-button calendar-event-button-green">
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
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="achievements-container"
  >
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="achievements-header"
    >
      <div>
        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="achievements-title"
        >
          Your Achievements
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="achievements-subtitle"
        >
          Celebrate your learning milestones and accomplishments
        </motion.p>
      </div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="achievements-earned-count"
      >
        <p className="achievements-earned-value">3</p>
        <p className="achievements-earned-label">Earned</p>
      </motion.div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="achievements-grid"
    >
      {[
        { id: 1, title: 'First Course Completed', description: 'Complete your first course', earned: true, icon: Award, color: 'from-yellow-400 to-orange-500' },
        { id: 2, title: 'Quiz Master', description: 'Score 90%+ in 5 quizzes', earned: true, icon: Trophy, color: 'from-blue-400 to-indigo-500' },
        { id: 3, title: 'Fast Learner', description: 'Complete 2 courses in 30 days', earned: true, icon: Clock, color: 'from-green-400 to-emerald-500' },
        { id: 4, title: 'Perfect Attendance', description: 'Attend all live sessions', earned: false, icon: Users, color: 'from-gray-300 to-gray-400' },
        { id: 5, title: 'Top Performer', description: 'Rank in top 10% of class', earned: false, icon: Star, color: 'from-gray-300 to-gray-400' },
        { id: 6, title: 'Study Group Leader', description: 'Lead a study group of 10+', earned: false, icon: Users, color: 'from-gray-300 to-gray-400' }
      ].map((achievement, index) => (
        <motion.div
          key={achievement.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
          className={`achievement-card ${
            achievement.earned
              ? 'achievement-card-earned'
              : 'achievement-card-not-earned'
          }`}
        >
          <div className="achievement-card-content">
            <div
              className={`achievement-icon-bg ${
                achievement.earned
                  ? `achievement-icon-bg-${achievement.color.split('-')[1]}-${achievement.color.split('-')[3]}`
                  : 'achievement-icon-bg-gray'
              }`}
            >
              <achievement.icon className="achievement-icon" />
            </div>
            <div className="achievement-details">
              <h3 className="achievement-title">{achievement.title}</h3>
              <p className="achievement-description">{achievement.description}</p>
              {achievement.earned && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="achievement-earned-badge-wrapper"
                >
                  <span className="achievement-earned-badge">
                    Earned
                  </span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.0 }}
      className="achievements-summary-card"
    >
      <div className="achievements-summary-grid">
        <div className="achievements-summary-item">
          <div className="achievements-summary-icon-bg">
            <BookOpen className="achievements-summary-icon" />
          </div>
          <p className="achievements-summary-value">4</p>
          <p className="achievements-summary-label">Courses</p>
        </div>
        <div className="achievements-summary-item">
          <div className="achievements-summary-icon-bg">
            <CheckCircle className="achievements-summary-icon" />
          </div>
          <p className="achievements-summary-value">2</p>
          <p className="achievements-summary-label">Completed</p>
        </div>
        <div className="achievements-summary-item">
          <div className="achievements-summary-icon-bg">
            <Trophy className="achievements-summary-icon" />
          </div>
          <p className="achievements-summary-value">3</p>
          <p className="achievements-summary-label">Achievements</p>
        </div>
        <div className="achievements-summary-item">
          <div className="achievements-summary-icon-bg">
            <Star className="achievements-summary-icon" />
          </div>
          <p className="achievements-summary-value">4.7</p>
          <p className="achievements-summary-label">Avg. Rating</p>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// Main App Component
const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCourseTab, setActiveCourseTab] = useState('videos');
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for courses
  const courses = [
    {
      id: 1,
      title: 'ICJS (Indian Cyber Justice System)',
      description: 'Comprehensive training on India\'s cyber justice framework and digital forensics',
      duration: '12 weeks',
      progress: 75,
      rating: 4.8,
      students: 1250,
      category: 'Cyber Law',
      image: 'https://placehold.co/400x250/6366f1/ffffff?text=ICJS',
      modules: 8,
      instructor: 'Dr. Priya Sharma',
      color: 'from-indigo-500 to-purple-600'
    },
    {
      id: 2,
      title: 'CCTNS (Crime and Criminal Tracking Network & Systems)',
      description: 'Master the national database system for crime tracking and investigation',
      duration: '10 weeks',
      progress: 45,
      rating: 4.6,
      students: 980,
      category: 'Investigation',
      image: 'https://placehold.co/400x250/0ea5e9/ffffff?text=CCTNS',
      modules: 6,
      instructor: 'Inspector Raj Kumar',
      color: 'from-sky-500 to-cyan-600'
    },
    {
      id: 3,
      title: 'Khoj App Training',
      description: 'Advanced training on India\'s criminal investigation mobile application',
      duration: '8 weeks',
      progress: 20,
      rating: 4.9,
      students: 750,
      category: 'Mobile Technology',
      image: 'https://placehold.co/400x250/f59e0b/ffffff?text=Khoj+App',
      modules: 5,
      instructor: 'Tech Specialist Anil',
      color: 'from-amber-500 to-orange-600'
    },
    {
      id: 4,
      title: 'New Criminal Law',
      description: 'Updated training on recent amendments in criminal law and procedures',
      duration: '14 weeks',
      progress: 90,
      rating: 4.7,
      students: 1100,
      category: 'Legal Studies',
      image: 'https://placehold.co/400x250/ec4899/ffffff?text=Criminal+Law',
      modules: 10,
      instructor: 'Advocate Meera Patel',
      color: 'from-pink-500 to-rose-600'
    }
  ];

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const renderContent = () => {
    if (selectedCourse) {
      return (
        <CourseDetail 
          course={selectedCourse} 
          activeCourseTab={activeCourseTab}
          setActiveCourseTab={setActiveCourseTab}
          setSelectedCourse={setSelectedCourse}
        />
      );
    }

    switch (activeTab) {
      case 'dashboard':
        return <Dashboard courses={courses} setSelectedCourse={setSelectedCourse} />;
      case 'courses':
        return <Courses courses={courses} setSelectedCourse={setSelectedCourse} searchQuery={searchQuery} />;
      case 'my-courses':
        return <MyCourses courses={courses} setSelectedCourse={setSelectedCourse} />;
      case 'calendar':
        return <CalendarView />;
      case 'achievements':
        return <Achievements />;
      default:
        return <Dashboard courses={courses} setSelectedCourse={setSelectedCourse} />;
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="app-container">
      <AnimatePresence>
        {(sidebarOpen || window.innerWidth >= 1024) && (
          <Sidebar 
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            setSelectedCourse={setSelectedCourse}
            setSidebarOpen={setSidebarOpen}
          />
        )}
      </AnimatePresence>
      
      {/* Overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && window.innerWidth < 1024 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="app-overlay-mobile lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <div className="app-content-area">
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} setSidebarOpen={setSidebarOpen} />
        <main className="app-main-content">
          <div className="app-main-content-inner">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
