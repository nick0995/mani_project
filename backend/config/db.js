import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;


export const pool = new Pool({
  host: process.env.PG_HOST || "localhost",
  port: process.env.PG_PORT || 5432,
  user: process.env.PG_USER || "postgres",
  password: process.env.PG_PASSWORD || "rohit",
  database: process.env.PG_DATABASE||"ppreactdb",
});


pool.on("connect", () => {
  console.log("✅ PostgreSQL connected");
});

pool.on("error", (err) => {
  console.error("❌ PostgreSQL error:", err);
});
export default pool;