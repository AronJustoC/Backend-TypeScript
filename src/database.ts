import { connect } from "mongoose";

export async function ConnectDatabase() {
  try {
    await connect("mongodb://localhost:27017/todolist");
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log(error);
  }
}
