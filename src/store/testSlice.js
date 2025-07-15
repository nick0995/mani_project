import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [],
  currentQuestion: 0,
  answers: {},
  timeLeft: 0,
  isTestStarted: false,
  testCategory: null,
  loading: false,
  error: null,
  results: [],
};

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setCurrentQuestion: (state, action) => {
      state.currentQuestion = action.payload;
    },
    setAnswer: (state, action) => {
      const { questionId, answer } = action.payload;
      state.answers[questionId] = answer;
    },
    setTimeLeft: (state, action) => {
      state.timeLeft = action.payload;
    },
    startTest: (state, action) => {
      state.isTestStarted = true;
      state.testCategory = action.payload;
      state.timeLeft = 30 * 60; // 30 minutes
    },
    endTest: (state) => {
      state.isTestStarted = false;
      state.currentQuestion = 0;
      state.answers = {};
      state.timeLeft = 0;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setResults: (state, action) => {
      state.results = action.payload;
    },
    resetTest: (state) => {
      state.questions = [];
      state.currentQuestion = 0;
      state.answers = {};
      state.timeLeft = 0;
      state.isTestStarted = false;
      state.testCategory = null;
      state.error = null;
    },
  },
});

export const {
  setQuestions,
  setCurrentQuestion,
  setAnswer,
  setTimeLeft,
  startTest,
  endTest,
  setLoading,
  setError,
  setResults,
  resetTest,
} = testSlice.actions;

export default testSlice.reducer;