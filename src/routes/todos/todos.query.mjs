import { pool } from "../../config/db.mjs";

export async function getAllTodosByUser(userId) {
  const [rows] = await pool.query("SELECT * FROM todos WHERE user_id = ?", [userId]);
  return rows;
}

export const createTodo = async (userId, title, description, dueTime, status) => {
    const [result] = await pool.query(
        "INSERT INTO todo (title, description, due_time, status, user_id) VALUES (?, ?, ?, ?, ?)",
        [title, description, dueTime, status, userId]
    );
    return result.insertId;
};

export const getTodoById = async (todoId, userId) => {
    const [result] = await pool.query("SELECT * FROM todo WHERE id = ? AND user_id = ?", [todoId, userId]);
    return result[0];
};

export const updateTodo = async (todoId, userId, title, description, dueTime, status) => {
    await pool.query(
        "UPDATE todo SET title = ?, description = ?, due_time = ?, status = ? WHERE id = ? AND user_id = ?",
        [title, description, dueTime, status, todoId, userId]
    );
};

export const deleteTodo = async (todoId, userId) => {
    await pool.query("DELETE FROM todo WHERE id = ? AND user_id = ?", [todoId, userId]);
};
