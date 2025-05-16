import "dotenv/config";
import process from "node:process";
import { ConnectDatabase } from "./database";
import CreateServer from "./server";

const port = process.env.PORT || 4000;

ConnectDatabase();
const app = CreateServer();

app.listen(port, () => {
  console.log(`Se está ejecutando en el puerto ${port}`);
});

export default app;
