import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: new URL("../../.env", import.meta.url).pathname });

export const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: "epytodo",
  waitForConnections: true,
  connectionLimit: 10,
});
