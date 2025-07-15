import sequelize from '../config/database.js';
import User from './User.js';
import Question from './Question.js';
import TestResult from './TestResult.js';

// Define associations
User.hasMany(TestResult, { foreignKey: 'userId' });
TestResult.belongsTo(User, { foreignKey: 'userId' });

export { sequelize, User, Question, TestResult };