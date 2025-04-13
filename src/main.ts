import process from "process";
import express from "express";
import "dotenv/config";
import { ConnectDatabase } from "./database";
import bodyParser from "body-parser";
import todoRoutes from "./routes/todo-list.route";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import { validateToken } from "./middleware/jwt.middleware";

const port = process.env.PORT || 4000;

const app = express();
app.use(bodyParser.json());

app.use("/todos", validateToken, todoRoutes);
app.use("/users", validateToken, userRoutes);
app.use("/auth", authRoutes);

ConnectDatabase();

app.listen(port, () => {
  console.log(`Se esta ejecutando en puerto ${port}`);
});
