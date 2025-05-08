import process from "process";
import express from "express";
import "dotenv/config";
import { ConnectDatabase } from "./database";
import bodyParser from "body-parser";
import todoRoutes from "./routes/todo-list.route";
import userRoutes from "./routes/user.route";
import authRoutes from "./routes/auth.route";
import { validateToken } from "./middleware/jwt.middleware";
import { rateLimit } from "express-rate-limit";

const port = process.env.PORT || 4000;

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const app = express();
app.use(bodyParser.json());
app.use(limiter);

app.use("/todos", validateToken, todoRoutes);
app.use("/users", validateToken, userRoutes);
app.use("/auth", authRoutes);

ConnectDatabase();

app.listen(port, () => {
  console.log(`Se esta ejecutando en puerto ${port}`);
});
