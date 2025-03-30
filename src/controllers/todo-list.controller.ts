import type { Request, Response } from "express";
import TodoService from "../services/todo-list.service";

class TodoController {
  async get(req: Request, res: Response) {
    try {
      const todos = await TodoService.getAll();
      res.status(200).json({ data: todos });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { title, description, done } = req.body;
      const todo = await TodoService.create({
        title,
        description,
        done,
      });
      res.status(201).json({ data: todo });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, done } = req.body;
      const todo = await TodoService.update(id as string, {
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
      const { id } = req.params;
      await TodoService.remove(id as string);
      res.status(201).json({ data: "ok" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

const todoController = new TodoController();

export default todoController;
