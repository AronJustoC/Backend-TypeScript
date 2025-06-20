import type { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  async get(req: Request, res: Response) {
    try {
      const users = await UserService.getAll();
      res.status(200).json({ data: users });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      const user = await UserService.create({
        name,
        email,
        password,
      });
      res.status(201).json({ data: user });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { name, email, password } = req.body;
      const todo = await UserService.update(id as string, {
        name,
        email,
        password,
      });
      res.status(201).json({ data: todo });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async remove(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await UserService.remove(id as string);
      res.status(201).json({ data: "ok" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async getTodosByUser(req: Request, res: Response) {
    try {
      const user_id = req.headers.user_id as string;
      console.log({ user_id });
      const todos = await UserService.getTodosByUser(user_id);
      res.status(200).json({ data: todos });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

const userController = new UserController();

export default userController;
