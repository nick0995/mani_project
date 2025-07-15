const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgresql://username:password@localhost:5432/punjab_police_portal', {
  dialect: 'postgres',
  logging: false,
});

module.exports = sequelize;