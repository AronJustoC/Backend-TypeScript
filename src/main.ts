import express from "express";
import { ConnectDatabase } from "./database";
import bodyParser from "body-parser";
import todoListRoutes from "./routes/todo-list.route";

const app = express();

app.use(bodyParser.json());

const port = 4000;

ConnectDatabase();

app.use("/todos", todoListRoutes);

app.listen(port, () => {
  console.log(`Se esta ejecutando en puerto ${port}`);
});
