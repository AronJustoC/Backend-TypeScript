import { connect } from "mongoose";
import process from "process";

export async function ConnectDatabase() {
  try {
    await connect(process.env.MONGODB_URI || "");
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log(error);
  }
}
