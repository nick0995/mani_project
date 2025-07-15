import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginSuccess, loginFailure } from './store/authSlice';
import { authAPI } from './services/api';

// Components
import Header from './components/Layout/Header';
import Navigation from './components/Layout/Navigation';
import Home from './components/Home/Home';
import Login from './components/Auth/Login';
import UserDashboard from './components/Dashboard/UserDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import TrainingModule from './components/Training/TrainingModule';
import TestInstructions from './components/Test/TestInstructions';
import TestInterface from './components/Test/TestInterface';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        const response = await authAPI.getCurrentUser();
        dispatch(loginSuccess(response.data.user));
      } catch (error) {
        dispatch(loginFailure('Not authenticated'));
      }
    };

    checkAuth();
  }, [dispatch]);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <Navigation />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={
              isAuthenticated ? (
                <Navigate to={user?.role === 'admin' ? '/admin' : '/dashboard'} replace />
              ) : (
                <Login />
              )
            } />
            
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/admin" element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/cctns" element={
              <ProtectedRoute>
                <TrainingModule />
              </ProtectedRoute>
            } />
            
            <Route path="/icjs" element={
              <ProtectedRoute>
                <TrainingModule />
              </ProtectedRoute>
            } />
            
            <Route path="/khoj" element={
              <ProtectedRoute>
                <TrainingModule />
              </ProtectedRoute>
            } />
            
            <Route path="/instructions/:category" element={
              <ProtectedRoute>
                <TestInstructions />
              </ProtectedRoute>
            } />
            
            <Route path="/test/:category" element={
              <ProtectedRoute>
                <TestInterface />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;