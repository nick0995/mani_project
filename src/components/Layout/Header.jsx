import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { logout } from '../../store/authSlice';
import { authAPI } from '../../services/api';

const Header = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await authAPI.logout();
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-gradient-to-r from-amber-500 to-green-700 text-white">
      <div className="container mx-auto px-4 py-2">
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <div>
              <span className="block text-xs">ਪੰਜਾਬ ਸਰਕਾਰ</span>
              <span className="font-bold">GOVERNMENT OF PUNJAB</span>
            </div>
            <div>
              <span className="block text-xs">ਪੰਜਾਬ ਪੁਲਿਸ</span>
              <span className="font-bold">PUNJAB POLICE</span>
            </div>
            <div>
              <span className="block text-xs">ਤਕਨੀਕੀ ਸੇਵਾਵਾਂ</span>
              <span className="font-bold">TECHNICAL SUPPORT SERVICES</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#main-content" className="hover:underline">SKIP TO MAIN CONTENT</a>
            <span>|</span>
            <a href="#" className="hover:underline">SCREEN READER ACCESS</a>
            <span>|</span>
            <button className="hover:underline">A+</button>
            <span>|</span>
            <button className="hover:underline">A</button>
            <span>|</span>
            <button className="hover:underline">A-</button>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-700 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img src="/logo.webp" alt="Punjab Police Logo" className="h-16 w-auto bg-white rounded-lg shadow p-2" />
              <h1 className="text-2xl font-bold">PUNJAB POLICE TRAINING PORTAL</h1>
            </div>
            
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>{user?.username}</span>
                  <span className="text-xs bg-blue-600 px-2 py-1 rounded">{user?.role}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <nav className="flex space-x-2">
                <button
                  onClick={() => navigate('/login')}
                  className="bg-gradient-to-r from-amber-500 to-green-700 hover:from-amber-600 hover:to-green-800 px-4 py-2 rounded transition-all"
                >
                  Login
                </button>
              </nav>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;