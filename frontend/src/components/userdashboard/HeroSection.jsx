import React, { useState, useEffect } from 'react';
import { Play, Users, BookOpen, Award, ChevronRight, Shield, Target, Zap } from 'lucide-react';

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const slides = [
    {
      title: "Advanced Police Training",
      subtitle: "Empowering Punjab Police with Modern Skills",
      description: "Comprehensive training modules designed for contemporary law enforcement challenges"
    },
    {
      title: "Professional Development",
      subtitle: "Building Tomorrow's Police Force",
      description: "Interactive courses covering forensics, cyber crime, and community policing"
    },
    {
      title: "Excellence in Service",
      subtitle: "Serving Punjab with Pride",
      description: "Continuous learning platform for career advancement and skill enhancement"
    }
  ];

  const stats = [
    { icon: Users, label: "Active Officers", value: "12,000+" },
    { icon: BookOpen, label: "Training Modules", value: "150+" },
    { icon: Award, label: "Certifications", value: "25+" },
    { icon: Shield, label: "Success Rate", value: "94%" }
  ];

  const features = [
    { icon: Target, title: "Specialized Training", desc: "Advanced modules for different police departments" },
    { icon: Zap, title: "Interactive Learning", desc: "Engaging simulations and real-world scenarios" },
    { icon: Award, title: "Certification", desc: "Official certificates upon course completion" }
  ];

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
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

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-16">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-blue-700 rounded-lg flex items-center justify-center shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-yellow-400">Punjab Police</h1>
              <p className="text-gray-300 text-sm">Training Portal</p>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            {['Courses', 'Certifications', 'Resources', 'Support'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-300 hover:text-yellow-400 transition-colors duration-300 font-medium"
              >
                {item}
              </a>
            ))}
          </nav>
        </header>

        {/* Main Hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Left */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              {slides[currentSlide].title}
            </h2>
            <h3 className="text-2xl text-gray-300 mb-4 font-light">{slides[currentSlide].subtitle}</h3>
            <p className="text-lg text-gray-400 mb-8">{slides[currentSlide].description}</p>

            <div className="flex flex-wrap gap-4 mb-8">
              <button className="group bg-gradient-to-r from-red-600 to-blue-700 hover:from-red-700 hover:to-blue-800 text-white px-8 py-4 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl">
                <Play className="w-5 h-5" />
                <span>Start Training</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="border-2 border-gray-500 text-gray-300 hover:bg-gray-800 px-8 py-4 rounded-lg font-semibold transition-all duration-300">
                View Catalog
              </button>
            </div>

            {/* Indicators */}
            <div className="flex space-x-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'bg-yellow-400 w-8' : 'bg-gray-500 hover:bg-gray-400'
                  }`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>

          {/* Right */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">Quick Access</h3>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-blue-700 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{feature.title}</h4>
                      <p className="text-gray-300 text-sm">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="bg-white/5 backdrop-blur-md border border-white/20 rounded-xl p-6 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-blue-700 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-300 text-sm">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
