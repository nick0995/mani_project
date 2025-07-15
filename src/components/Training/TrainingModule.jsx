import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Play, FileText, Award, BookOpen } from 'lucide-react';

const TrainingModule = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const moduleData = {
    cctns: {
      title: 'CCTNS Training',
      fullName: 'Crime and Criminal Tracking Network & Systems',
      description: 'The Crime and Criminal Tracking Network & Systems (CCTNS) is a Mission Mode Project (MMP) under the National e-Governance Plan (NeGP) of the Government of India. It aims to create a comprehensive and integrated system for enhancing the efficiency and effectiveness of policing at the police station level.',
      objectives: [
        'Make the Police functioning citizen friendly and transparent',
        'Improve service delivery to the general public',
        'Provide the Investigating Officers tools for investigation and crime detection',
        'Improve the efficiency of police functions through automation',
        'Facilitate interaction and data exchange among police stations, state headquarters and central organizations'
      ],
      videos: [
        { title: 'Introduction to CCTNS', url: '#' },
        { title: 'CCTNS Software Walkthrough', url: '#' },
        { title: 'Case Registration Process', url: '#' }
      ],
      materials: [
        { title: 'CCTNS User Manual', type: 'PDF', url: '#' },
        { title: 'CCTNS Implementation Guidelines', type: 'PDF', url: '#' },
        { title: 'CCTNS FAQs', type: 'PDF', url: '#' }
      ]
    },
    icjs: {
      title: 'ICJS Training',
      fullName: 'Interoperable Criminal Justice System',
      description: 'The Interoperable Criminal Justice System (ICJS) is a project of the Government of India aiming to integrate the pillars of the criminal justice system - Police, Courts, Prisons, Prosecution, and Forensic Labs.',
      objectives: [
        'Integration of key justice delivery institutions',
        'Reduction in delays through seamless information sharing',
        'Improved coordination among stakeholders',
        'Reduction in manual data entry and paperwork',
        'Enhanced monitoring and accountability'
      ],
      videos: [
        { title: 'Introduction to ICJS', url: '#' },
        { title: 'ICJS Data Sharing Mechanism', url: '#' },
        { title: 'ICJS Integration with CCTNS', url: '#' }
      ],
      materials: [
        { title: 'ICJS User Manual', type: 'PDF', url: '#' },
        { title: 'ICJS Implementation Roadmap', type: 'PDF', url: '#' },
        { title: 'ICJS Data Standards', type: 'PDF', url: '#' }
      ]
    },
    khoj: {
      title: 'KHOJ Training',
      fullName: 'Knowledge Hub for Online Judicial Services',
      description: 'KHOJ is an initiative by Punjab Police aimed at enhancing the capabilities of law enforcement agencies through advanced technology and data analytics.',
      objectives: [
        'Advanced data analytics for crime prevention',
        'Enhanced search and investigation capabilities',
        'Integration with existing police systems',
        'Real-time monitoring and alerts',
        'Improved decision-making through data insights'
      ],
      videos: [
        { title: 'Introduction to KHOJ', url: '#' },
        { title: 'KHOJ Analytics Dashboard', url: '#' },
        { title: 'KHOJ Integration Features', url: '#' }
      ],
      materials: [
        { title: 'KHOJ User Manual', type: 'PDF', url: '#' },
        { title: 'KHOJ Analytics Guide', type: 'PDF', url: '#' },
        { title: 'KHOJ Best Practices', type: 'PDF', url: '#' }
      ]
    }
  };

  const data = moduleData[category];

  if (!data) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Module Not Found</h2>
          <p className="text-gray-600">The requested training module does not exist.</p>
        </div>
      </div>
    );
  }

  const handleStartTest = () => {
    navigate(`/instructions/${category}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-800 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
          <p className="text-xl mb-6">{data.fullName}</p>
          <button
            onClick={handleStartTest}
            className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition-colors flex items-center space-x-2 mx-auto"
          >
            <Play className="h-5 w-5" />
            <span>Take Assessment</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md">
          {/* Tab Navigation */}
          <div className="border-b">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-6 font-medium border-b-2 transition-colors ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <BookOpen className="inline h-4 w-4 mr-2" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab('videos')}
                className={`py-4 px-6 font-medium border-b-2 transition-colors ${
                  activeTab === 'videos'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Play className="inline h-4 w-4 mr-2" />
                Training Videos
              </button>
              <button
                onClick={() => setActiveTab('materials')}
                className={`py-4 px-6 font-medium border-b-2 transition-colors ${
                  activeTab === 'materials'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <FileText className="inline h-4 w-4 mr-2" />
                Study Materials
              </button>
              <button
                onClick={() => setActiveTab('quiz')}
                className={`py-4 px-6 font-medium border-b-2 transition-colors ${
                  activeTab === 'quiz'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Award className="inline h-4 w-4 mr-2" />
                Assessment
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {data.title} Overview
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {data.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-4">Key Objectives</h4>
                  <ul className="space-y-2">
                    {data.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <span className="text-blue-600 text-xl leading-none">•</span>
                        <span className="text-gray-700">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="text-lg font-bold text-blue-800 mb-2">Ready to Test Your Knowledge?</h4>
                  <p className="text-blue-700 mb-4">
                    Complete the assessment to earn your certification. You need to score at least 75% to pass.
                  </p>
                  <button
                    onClick={handleStartTest}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                  >
                    <Play className="h-4 w-4" />
                    <span>Start Assessment</span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'videos' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Training Videos</h3>
                <p className="text-gray-600 mb-6">
                  Watch these instructional videos to learn about {data.title} implementation and usage:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.videos.map((video, index) => (
                    <div key={index} className="bg-gray-100 rounded-lg p-6">
                      <div className="aspect-video bg-gray-300 rounded-lg mb-4 flex items-center justify-center">
                        <Play className="h-12 w-12 text-gray-500" />
                      </div>
                      <h4 className="font-bold text-gray-800 mb-2">{video.title}</h4>
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        Watch Video
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'materials' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Study Materials</h3>
                <p className="text-gray-600 mb-6">
                  Download these resources for detailed information about {data.title}:
                </p>
                
                <div className="space-y-4">
                  {data.materials.map((material, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-6 flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <FileText className="h-8 w-8 text-blue-600" />
                        <div>
                          <h4 className="font-bold text-gray-800">{material.title}</h4>
                          <p className="text-sm text-gray-600">{material.type} Document</p>
                        </div>
                      </div>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Download
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Assessment</h3>
                <p className="text-gray-600 mb-6">
                  Test your knowledge of {data.title}. Score more than 75% to receive your certification.
                </p>
                
                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-8 text-center">
                  <Award className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-gray-800 mb-2">Ready for the Challenge?</h4>
                  <p className="text-gray-600 mb-6">
                    The assessment consists of multiple-choice questions covering all aspects of {data.title}.
                    Make sure you have studied all the materials before attempting the test.
                  </p>
                  
                  <div className="bg-white rounded-lg p-6 mb-6 text-left">
                    <h5 className="font-bold text-gray-800 mb-2">Test Information:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Duration: 30 minutes</li>
                      <li>• Questions: Multiple choice</li>
                      <li>• Passing Score: 75%</li>
                      <li>• Attempts: Unlimited</li>
                      <li>• Certificate: Available upon passing</li>
                    </ul>
                  </div>
                  
                  <button
                    onClick={handleStartTest}
                    className="bg-green-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Begin Assessment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrainingModule;