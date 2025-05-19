import { db } from "../../config/db.mjs";

export async function getUserByEmail(email) {
  const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [email]);
  return rows[0];
}

export async function createUser({ email, password, name }) {
  const [result] = await db.query(
    "INSERT INTO user (email, password, name) VALUES (?, ?, ?)",
    [email, password, name]
  );
  return { id: result.insertId };
}

export async function getUserById(userId) {
  const [rows] = await db.query("SELECT * FROM user WHERE id = ?", [userId]);
  return rows[0];
}

export async function updateUser(userId, updates) {
  const { email, password, name } = updates;
  await db.query(
    `UPDATE user
     SET email = ?, password = ?, name = ?
     WHERE id = ?`,
    [email, password, name, userId]
  );
}

export async function deleteUser(userId) {
  await db.query("DELETE FROM user WHERE id = ?", [userId]);
}
