import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return null;
  }

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/cctns', label: 'CCTNS' },
    { path: '/icjs', label: 'ICJS' },
    { path: '/khoj', label: 'KHOJ' },
    { path: '/profile', label: 'My Profile' },
  ];

  if (user?.role === 'admin') {
    navItems.push({ path: '/admin', label: 'Admin Panel' });
  }

  return (
    <nav className="bg-slate-800 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex space-x-0">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`px-6 py-3 bg-gradient-to-r from-amber-500 to-green-700 hover:from-amber-600 hover:to-green-800 transition-all font-medium border-r border-slate-600 last:border-r-0 ${
                location.pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : 'text-white hover:bg-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;