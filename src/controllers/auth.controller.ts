import type { Request, Response } from "express";
import UserService from "../services/user.service";
import { ValidateToken } from "../utils/jwt.util";
import OtpService from "../services/opt.service";
import { compare } from "../utils/encrypt.util";
import OtpRepository from "../repository/opt.repository";

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
      await OtpService.create(email);
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
        res.status(401).json({ error: "invalid token" });
      }
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async generateNewOtp(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await OtpService.create(email);
      res.status(200).json({ data: "ok" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }

  async validateOtp(req: Request, res: Response) {
    try {
      const { email, code } = req.body;
      const user = await UserService.getByEmail(email);
      if (!user) {
        res.status(404).json({ error: "user not found" });
      }
      const found = await OtpRepository.find(email);
      if (!found) {
        res.status(404).json({ error: "code not found" });
      }
      const isValid = await compare(code, found.code ?? "");
      if (!isValid) {
        res.status(403).json({ error: "code not found" });
      }
      await UserService.update(user?._id.toString() ?? "", { verified: true });
      res.status(200).json({ data: "user verified" });
    } catch (error) {
      res.status(500).json({ error });
    }
  }
}
const authController = new AuthController();

export default authController;
