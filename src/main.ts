import express from "express";
import { ConnectDatabase } from "./database";
import { listItems, createItem, updateItem, deleteItem } from "./todo-list";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());

const port = 4000;

ConnectDatabase();

app.post("/items", async (req, res) => {
  const body = req.body;
  res.status(200).json(body);
});

app.get("/", async (req, res) => {
  try {
    const result = await listItems();
    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/", async (req, res) => {
  const { title, description, done } = req.body;
  try {
    const newTodo = {
      title,
      description,
      done,
    };
    const data = await createItem(newTodo);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.patch("/:id", async (req, res) => {
  try {
    const body = req.body;
    const { id } = req.params;
    const data = await updateItem(id, body);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteItem(id);
    res.status(200).json({ status: "deleted" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Se esta ejecutando en puerto ${port}`);
});
