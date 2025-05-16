import express from "express";
import TodoRoutes from "./routes/todo-list.route";
import UserRoutes from "./routes/user.route";
import AuthRoutes from "./routes/auth.route";
import bodyParser from "body-parser";
import { rateLimit } from "express-rate-limit";
import { validateToken } from "./middleware/jwt.middleware";
import errorHandler from "./middleware/errorHandler.middleware";

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

export default function CreateServer() {
  const app = express();
  app.disable("x-powered-by");
  app.use(bodyParser.json());
  app.use(limiter);
  app.use("/todos", validateToken, TodoRoutes);
  app.use("/users", validateToken, UserRoutes);
  app.use("/auth", AuthRoutes);
  app.use(errorHandler);
  return app;
}
