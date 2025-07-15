import { Sequelize } from 'sequelize';
import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const DB_NAME = process.env.DB_NAME || 'punjab_police_portal';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASS = process.env.DB_PASS || 'postgres';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432;

// Function to ensure database exists
async function ensureDatabaseExists() {
  const { Client } = pg;
  const client = new Client({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASS,
    database: 'postgres', // Connect to default db to create new one
  });
  await client.connect();
  await client.query(`CREATE DATABASE "${DB_NAME}"`);
  await client.end();
}

// Ensure DB exists before Sequelize connects
await ensureDatabaseExists();

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
