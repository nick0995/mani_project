import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Award, Clock, TrendingUp, Play } from 'lucide-react';
import { testAPI } from '../../services/api';

const UserDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestResults();
  }, []);

  const fetchTestResults = async () => {
    try {
      const response = await testAPI.getResults();
      setTestResults(response.data);
    } catch (error) {
      console.error('Error fetching test results:', error);
    } finally {
      setLoading(false);
    }
  };

  const modules = [
    {
      id: 'cctns',
      title: 'CCTNS Training',
      description: 'Crime and Criminal Tracking Network & Systems',
      color: 'bg-blue-500',
      icon: BookOpen
    },
    {
      id: 'icjs',
      title: 'ICJS Training',
      description: 'Interoperable Criminal Justice System',
      color: 'bg-red-500',
      icon: BookOpen
    },
    {
      id: 'khoj',
      title: 'KHOJ Training',
      description: 'Advanced Analytics and Investigation Tools',
      color: 'bg-green-500',
      icon: BookOpen
    }
  ];

  const getModuleStats = (moduleId) => {
    const moduleResults = testResults.filter(result => result.category === moduleId);
    const bestScore = moduleResults.length > 0 ? Math.max(...moduleResults.map(r => r.percentage)) : 0;
    const attempts = moduleResults.length;
    const passed = moduleResults.some(r => r.isPassed);
    
    return { bestScore, attempts, passed };
  };

  const overallStats = {
    totalAttempts: testResults.length,
    totalPassed: testResults.filter(r => r.isPassed).length,
    averageScore: testResults.length > 0 ? testResults.reduce((sum, r) => sum + r.percentage, 0) / testResults.length : 0
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome, {user?.firstName} {user?.lastName}
          </h1>
          <p className="text-gray-600">Punjab Police Training Portal - User Dashboard</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Attempts</p>
                <p className="text-2xl font-bold text-gray-800">{overallStats.totalAttempts}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tests Passed</p>
                <p className="text-2xl font-bold text-green-600">{overallStats.totalPassed}</p>
              </div>
              <Award className="h-8 w-8 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-purple-600">{overallStats.averageScore.toFixed(1)}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Certificates</p>
                <p className="text-2xl font-bold text-amber-600">{overallStats.totalPassed}</p>
              </div>
              <Award className="h-8 w-8 text-amber-500" />
            </div>
          </div>
        </div>

        {/* Training Modules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {modules.map((module) => {
            const stats = getModuleStats(module.id);
            const Icon = module.icon;
            
            return (
              <div key={module.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className={`${module.color} text-white p-6`}>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold">{module.title}</h3>
                      <p className="text-sm opacity-90">{module.description}</p>
                    </div>
                    <Icon className="h-8 w-8" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Best Score</p>
                      <p className="text-lg font-bold text-gray-800">{stats.bestScore.toFixed(1)}%</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-600">Attempts</p>
                      <p className="text-lg font-bold text-gray-800">{stats.attempts}</p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-medium text-gray-800">{stats.bestScore.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${stats.passed ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ width: `${Math.min(stats.bestScore, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {stats.passed && (
                    <div className="bg-green-100 text-green-800 text-sm px-3 py-2 rounded-lg mb-4">
                      ✓ Certified - Test Passed
                    </div>
                  )}
                  
                  <button
                    onClick={() => navigate(`/${module.id}`)}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>Start Training</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Test Results */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Test Results</h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {loading ? (
              <div className="p-6 text-center">Loading...</div>
            ) : testResults.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No test results yet. Start a training module to begin!
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Module
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Score
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Percentage
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {testResults.slice(0, 10).map((result, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm font-medium text-gray-900 uppercase">
                            {result.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {result.score}/{result.totalQuestions}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {result.percentage.toFixed(1)}%
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            result.isPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>
                            {result.isPassed ? 'Passed' : 'Failed'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(result.completedAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;