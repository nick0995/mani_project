import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Clock, Flag, ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { setQuestions, setCurrentQuestion, setAnswer, setTimeLeft, endTest } from '../../store/testSlice';
import { testAPI } from '../../services/api';

const TestInterface = () => {
  const { category } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { questions, currentQuestion, answers, timeLeft } = useSelector((state) => state.test);
  const [loading, setLoading] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [testResults, setTestResults] = useState(null);
  const [markedQuestions, setMarkedQuestions] = useState(new Set());
  const [startTime] = useState(Date.now());

  useEffect(() => {
    fetchQuestions();
  }, [category]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => {
        dispatch(setTimeLeft(timeLeft - 1));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && questions.length > 0) {
      handleSubmitTest();
    }
  }, [timeLeft, questions.length, dispatch]);

  const fetchQuestions = async () => {
    try {
      const response = await testAPI.getQuestions(category);
      dispatch(setQuestions(response.data));
      dispatch(setTimeLeft(30 * 60)); // 30 minutes
      setLoading(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    dispatch(setAnswer({ questionId, answer: answerIndex }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      dispatch(setCurrentQuestion(currentQuestion + 1));
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      dispatch(setCurrentQuestion(currentQuestion - 1));
    }
  };

  const handleQuestionSelect = (questionIndex) => {
    dispatch(setCurrentQuestion(questionIndex));
  };

  const handleMarkForReview = () => {
    const questionId = questions[currentQuestion].id;
    setMarkedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const handleSubmitTest = async () => {
    if (window.confirm('Are you sure you want to submit the test?')) {
      try {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);
        const response = await testAPI.submitTest({
          category,
          answers,
          timeSpent
        });
        
        setTestResults(response.data);
        setShowResults(true);
        dispatch(endTest());
      } catch (error) {
        console.error('Error submitting test:', error);
      }
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getQuestionStatus = (questionId, index) => {
    const isAnswered = answers.hasOwnProperty(questionId);
    const isMarked = markedQuestions.has(questionId);
    const isCurrentQuestion = index === currentQuestion;
    
    if (isCurrentQuestion) return 'current';
    if (isAnswered && isMarked) return 'answered-marked';
    if (isAnswered) return 'answered';
    if (isMarked) return 'marked';
    return 'not-visited';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'current': return 'bg-blue-600 text-white';
      case 'answered': return 'bg-green-500 text-white';
      case 'marked': return 'bg-yellow-400 text-black';
      case 'answered-marked': return 'bg-purple-500 text-white';
      default: return 'bg-gray-200 text-gray-700';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading test questions...</p>
        </div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
            <div className="text-center mb-8">
              <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Test Completed!</h2>
              <p className="text-gray-600">Your {category.toUpperCase()} test has been submitted successfully.</p>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-bold mb-4">Your Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Score</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {testResults?.result?.score}/{testResults?.result?.totalQuestions}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Percentage</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {testResults?.result?.percentage?.toFixed(1)}%
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Status</p>
                  <p className={`text-2xl font-bold ${
                    testResults?.result?.isPassed ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {testResults?.result?.isPassed ? 'PASSED' : 'FAILED'}
                  </p>
                </div>
              </div>
            </div>

            {testResults?.result?.isPassed && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h4 className="text-lg font-bold text-green-800 mb-2">🎉 Congratulations!</h4>
                <p className="text-green-700">
                  You have successfully passed the {category.toUpperCase()} training test with a score of {testResults?.result?.percentage?.toFixed(1)}%. 
                  Your certificate will be available in your dashboard.
                </p>
              </div>
            )}

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => navigate(`/${category}`)}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
              >
                Review Training Material
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;
  const markedCount = markedQuestions.size;

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-bold text-gray-800">
                {category.toUpperCase()} Training Test
              </h1>
              <p className="text-sm text-gray-600">
                Question {currentQuestion + 1} of {questions.length}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-red-600">
                <Clock className="h-5 w-5" />
                <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
              </div>
              <button
                onClick={handleSubmitTest}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Submit Test
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-4 sticky top-4">
              <h3 className="font-bold text-gray-800 mb-4">Question Navigation</h3>
              
              {/* Stats */}
              <div className="text-sm text-gray-600 mb-4">
                <div className="flex justify-between">
                  <span>Answered:</span>
                  <span className="font-medium">{answeredCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Marked:</span>
                  <span className="font-medium">{markedCount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Remaining:</span>
                  <span className="font-medium">{questions.length - answeredCount}</span>
                </div>
              </div>

              {/* Question Grid */}
              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, index) => {
                  const status = getQuestionStatus(q.id, index);
                  return (
                    <button
                      key={q.id}
                      onClick={() => handleQuestionSelect(index)}
                      className={`w-10 h-10 rounded text-sm font-medium transition-colors ${getStatusColor(status)}`}
                    >
                      {index + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-4 text-xs space-y-1">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded"></div>
                  <span>Answered</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-yellow-400 rounded"></div>
                  <span>Marked</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded"></div>
                  <span>Answered & Marked</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-gray-200 rounded"></div>
                  <span>Not Visited</span>
                </div>
              </div>
            </div>
          </div>

          {/* Question Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-gray-800 mb-4">
                  Question {currentQuestion + 1}
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {currentQ?.questionText}
                </p>
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQ?.options?.map((option, index) => (
                  <label
                    key={index}
                    className={`block p-4 rounded-lg border cursor-pointer transition-all ${
                      answers[currentQ.id] === index
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name={`question-${currentQ.id}`}
                        value={index}
                        checked={answers[currentQ.id] === index}
                        onChange={() => handleAnswerSelect(currentQ.id, index)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{option}</span>
                    </div>
                  </label>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={handleMarkForReview}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    markedQuestions.has(currentQ.id)
                      ? 'bg-yellow-500 text-white hover:bg-yellow-600'
                      : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  }`}
                >
                  <Flag className="h-4 w-4" />
                  <span>
                    {markedQuestions.has(currentQ.id) ? 'Unmark' : 'Mark for Review'}
                  </span>
                </button>

                <button
                  onClick={handleNext}
                  disabled={currentQuestion === questions.length - 1}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span>Next</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestInterface;