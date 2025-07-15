import { Sequelize } from 'sequelize';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

const DB_NAME = 'punjab_police_portal';
const DB_USER = 'root';
const DB_PASS = 'root';
const DB_HOST = 'localhost';
const DB_PORT = 3306;

// Function to ensure database exists
async function ensureDatabaseExists() {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
  await connection.end();
}

// Ensure DB exists before Sequelize connects
await ensureDatabaseExists();

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
});

export default sequelize;
