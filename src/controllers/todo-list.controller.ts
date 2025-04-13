import type { Request, Response } from "express";
import TodoService from "../services/todo-list.service";

class TodoController {
  async get(req: Request, res: Response) {
    try {
      const user_id = req.headers.user_id as string;
      const todos = await TodoService.getAll(user_id);
      res.status(200).json({ data: todos });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const user_id = req.headers.user_id as string;
      const { title, description, done } = req.body;
      console.log(user_id);
      const todos = await TodoService.create({
        title,
        description,
        done: done || false,
        user: user_id,
      });
      res.status(201).json({ data: todos });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const user_id = req.headers.user_id as string;
      const { id } = req.params as { id: string };
      const { title, description, done } = req.body;
      const todo = await TodoService.update(id, user_id, {
        title,
        description,
        done,
      });
      res.status(201).json({ data: todo });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const user_id = req.headers.user_id as string;
      const { id } = req.params as { id: string };
      await TodoService.remove(id, user_id);
      res.status(201).json({ data: "ok" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

const todoController = new TodoController();

export default todoController;
