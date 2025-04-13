import type { Request, Response } from "express";
import UserService from "../services/user.service";
import { ValidateToken } from "../utils/jwt.util";

class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await UserService.login(email, password);
      res.status(200).json({ token: token });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { name, email, password } = req.body;
      await UserService.create({ name, email, password });
      res.status(200).json({ data: "ok" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async refreshToken(req: Request, res: Response) {
    try {
      const header = req.header("Authorization") || "";
      const old_token = header.split(" ")[1]; // Bearer es decir el token de autenticacion de jwt que viene en la cabecera
      const { refresh_token } = req.body;
      const actual_token = (await ValidateToken(refresh_token)) as {
        token: string;
      };
      const user = (await ValidateToken(actual_token.token)) as {
        _id: string;
        email: string;
      };
      console.log(user);
      console.log(actual_token, old_token);
      if (actual_token.token === old_token) {
        const new_token = await UserService.refreshToken({
          _id: user._id,
          email: user.email,
        });
        res.status(200).json({ token: new_token });
      } else {
        res.status(401).json({ error: "Token invalido" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}

const authController = new AuthController();

export default authController;
