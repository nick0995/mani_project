const sequelize = require('../config/database');
const User = require('./User');
const Question = require('./Question');
const TestResult = require('./TestResult');

// Define associations
User.hasMany(TestResult, { foreignKey: 'userId' });
TestResult.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  Question,
  TestResult,
};