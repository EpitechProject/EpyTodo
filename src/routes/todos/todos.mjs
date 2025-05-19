import { Router } from "express";
import { authModule } from "../../middleware/auth.mjs";
import {
  getAllTodosByUser,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo
} from "./todos.query.mjs";

import { ErrorTypes, returnCommonError } from "../../utils/errors.mjs";
import { pool } from "../../config/db.mjs";

const LocalRouter = Router();

LocalRouter.use(authModule);

async function getUserIdFromEmail(email) {
  const [rows] = await pool.query("SELECT id FROM user WHERE email = ?", [email]);
  return rows.length ? rows[0].id : null;
}

LocalRouter.get("/todos", async (req, res) => {
  const userId = await getUserIdFromEmail(req.userEmail);
  const todos = await getAllTodosByUser(userId);
  res.send(todos);
});

LocalRouter.get("/todos/:id", async (req, res) => {
  const userId = await getUserIdFromEmail(req.userEmail);
  const todo = await getTodoById(req.params.id, userId);
  if (!todo) return returnCommonError(res, ErrorTypes.BadParameters);
  res.send(todo);
});

LocalRouter.post("/todos", async (req, res) => {
  const { title, description, due_time, status } = req.body;
  if (!title || !description || !due_time)
    return returnCommonError(res, ErrorTypes.BadParameters);

  const userId = await getUserIdFromEmail(req.userEmail);
  const result = await createTodo({ title, description, due_time, status, user_id: userId });
  res.status(201).send({ id: result.insertId });
});

LocalRouter.put("/todos/:id", async (req, res) => {
  const { title, description, due_time, status } = req.body;
  if (!title || !description || !due_time || !status)
    return returnCommonError(res, ErrorTypes.BadParameters);

  const userId = await getUserIdFromEmail(req.userEmail);
  await updateTodo(req.params.id, userId, { title, description, due_time, status });
  res.send({ msg: "Todo updated successfully" });
});

LocalRouter.delete("/todos/:id", async (req, res) => {
  const userId = await getUserIdFromEmail(req.userEmail);
  await deleteTodo(req.params.id, userId);
  res.send({ msg: "Todo deleted successfully" });
});

export default LocalRouter;
