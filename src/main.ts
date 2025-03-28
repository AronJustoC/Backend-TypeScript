import express from "express";

const app = express();
const port = 4000;

app.get("/", (_, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Se esta ejecutando en puerto ${port}`);
});
