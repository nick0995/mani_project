import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { BookOpen, Users, Award, TrendingUp } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const trainingModules = [
    {
      id: 'cctns',
      title: 'CCTNS',
      description: 'The Crime and Criminal Tracking Network & Systems (CCTNS) aims at creating a comprehensive and integrated system for effective policing through e-Governance.',
      features: [
        'Crime investigation system',
        'Prison management system',
        'Forensic lab integration',
        'Digitization of records',
        'Citizen services portal'
      ],
      color: 'bg-blue-500'
    },
    {
      id: 'icjs',
      title: 'ICJS',
      description: 'The Interoperable Criminal Justice System (ICJS) aims to integrate the main pillars of the criminal justice system - Police, Courts, Prisons, Prosecution, and Forensic Labs.',
      features: [
        'Seamless data exchange',
        'Common platform for justice delivery',
        'Electronic case management',
        'Integration with CCTNS',
        'Real-time access to case information'
      ],
      color: 'bg-red-500'
    },
    {
      id: 'khoj',
      title: 'KHOJ',
      description: 'KHOJ is an initiative by Punjab Police aimed at enhancing the capabilities of law enforcement agencies through advanced technology and data analytics.',
      features: [
        'Advanced analytics',
        'Data-driven investigations',
        'Enhanced search capabilities',
        'Integration with existing systems',
        'Real-time monitoring'
      ],
      color: 'bg-green-500'
    }
  ];

  const handleStartTraining = (moduleId) => {
    if (isAuthenticated) {
      navigate(`/${moduleId}`);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">
            PUNJAB POLICE TRAINING PROGRAM
          </h1>
          <p className="text-xl max-w-4xl mx-auto">
            Comprehensive online training for Crime and Criminal Tracking Network & Systems, 
            Interoperable Criminal Justice System and Khoj
          </p>
        </div>
      </div>
      {/* Dashboard Images Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <img src="/main.webp" alt="Dashboard 1" className="rounded-lg shadow-md w-full h-48 object-cover" />
          <img src="/main_3.webp" alt="Dashboard 2" className="rounded-lg shadow-md w-full h-48 object-cover" />
          <img src="/main_2.jpg" alt="Dashboard 3" className="rounded-lg shadow-md w-full h-48 object-cover" />
          <img src="/main_3.jpg" alt="Dashboard 4" className="rounded-lg shadow-md w-full h-48 object-cover" />
        </div>
      </div>
      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <BookOpen className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">3</h3>
              <p className="text-gray-600">Training Modules</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Users className="h-12 w-12 text-green-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">1000+</h3>
              <p className="text-gray-600">Active Users</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <Award className="h-12 w-12 text-amber-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">500+</h3>
              <p className="text-gray-600">Certificates Issued</p>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <TrendingUp className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="text-3xl font-bold text-gray-800">95%</h3>
              <p className="text-gray-600">Success Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Training Modules */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Training Modules
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {trainingModules.map((module) => (
              <div key={module.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className={`${module.color} text-white p-6`}>
                  <h3 className="text-2xl font-bold">{module.title}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{module.description}</p>
                  <h4 className="font-semibold mb-2">Key Features:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 mb-6">
                    {module.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleStartTraining(module.id)}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Start {module.title} Training
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-16 bg-slate-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">About the Training Program</h2>
            <p className="text-lg text-gray-300 mb-8">
              The Punjab Police Training Portal is designed to provide comprehensive online training 
              for law enforcement personnel on modern policing systems and technologies. Our programs 
              are designed to enhance efficiency, improve service delivery, and ensure effective 
              implementation of digital policing initiatives.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div className="bg-slate-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Interactive Learning</h3>
                <p className="text-gray-300">
                  Engaging content with videos, quizzes, and hands-on exercises.
                </p>
              </div>
              <div className="bg-slate-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Expert Instructors</h3>
                <p className="text-gray-300">
                  Learn from experienced professionals and subject matter experts.
                </p>
              </div>
              <div className="bg-slate-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-3">Certification</h3>
                <p className="text-gray-300">
                  Earn certificates upon successful completion of each module.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;