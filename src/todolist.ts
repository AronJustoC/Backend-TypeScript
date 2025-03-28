import { Document, Schema, model } from "mongoose";

export type TTodoList = {
  title: string;
  description: string;
  done: boolean;
};

export interface ITodoList extends Document, TTodoList {}

const todoListSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    required: true,
  },
});

const TodoList = model("TodoList", todoListSchema);

export default TodoList;
