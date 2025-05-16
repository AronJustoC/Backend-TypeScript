import "dotenv/config";
import process from "node:process";
import { ConnectDatabase } from "./database";
import CreateServer from "./server";
const port = process.env.PORT || 4000;

async function bootstrap() {
  await ConnectDatabase();
  const app = CreateServer();
  app.listen(port, () => {
    console.log(`Se está ejecutando en el puerto ${port}`);
  });
}

bootstrap().catch((error) => console.log(error));
