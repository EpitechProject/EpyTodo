import { pool } from "../../config/db.mjs";

export async function getUserByEmail(email) {
  const [rows] = await pool.execute("SELECT * FROM user WHERE email = ?", [email]);
  return rows[0];
}

export async function createUser({ email, password, name, firstname }) {
  const [result] = await pool.execute(
    "INSERT INTO user (email, password, name, firstname) VALUES (?, ?, ?, ?)",
    [email, password, name, firstname]
  );
  return result.insertId;
}
