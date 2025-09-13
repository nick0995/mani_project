import React from "react";
import { Facebook, Instagram, Youtube, Globe, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-black text-gray-300 pt-16 pb-8 overflow-hidden">
      {/* Neon Glow Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-20 w-72 h-72 bg-blue-700 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-20 w-72 h-72 bg-red-700 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 opacity-10">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <pattern
              id="grid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Logo & About */}
          <div>
            <h2 className="text-2xl font-bold text-yellow-400">
              Punjab Police <span className="text-white">Training Program</span>
            </h2>
            <p className="mt-4 text-sm text-gray-400 leading-relaxed">
              Providing quality professional training and certification
              programs to help officers advance their skills and serve with
              pride.
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://www.facebook.com/PunjabPoliceIndia" target="_blank" rel="noreferrer"
                 className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gradient-to-br from-red-600 to-blue-700 transition">
                <Facebook className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.instagram.com/punjabpoliceind/?hl=en" target="_blank" rel="noreferrer"
                 className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gradient-to-br from-red-600 to-blue-700 transition">
                <Instagram className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.youtube.com/c/PunjabPoliceIndiaOfficial" target="_blank" rel="noreferrer"
                 className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gradient-to-br from-red-600 to-blue-700 transition">
                <Youtube className="w-5 h-5 text-white" />
              </a>
              <a href="https://www.punjabpolice.gov.in/en/#" target="_blank" rel="noreferrer"
                 className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-gradient-to-br from-red-600 to-blue-700 transition">
                <Globe className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Courses</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-400 transition">All Courses</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">New Arrivals</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Featured</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Popular</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Certification</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-yellow-400 transition">Help Center</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Feedback</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Contact Us</a></li>
              <li><a href="#" className="hover:text-yellow-400 transition">Community</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get updates on new courses and offers.
            </p>
            <form className="flex mb-4">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 px-4 py-2 rounded-l-lg bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400"
              />
              <button
                type="button"
                className="px-4 py-2 rounded-r-lg bg-gradient-to-r from-red-600 to-blue-700 text-white font-medium hover:scale-105 transition"
              >
                Subscribe
              </button>
            </form>
            <div className="text-sm space-y-1">
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2 text-yellow-400" /> +91 9876543210
              </div>
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2 text-yellow-400" /> info@punjabpolicetraining.com
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-6 text-center text-sm text-gray-500">
          © 2025 Punjab Police Training Program. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
