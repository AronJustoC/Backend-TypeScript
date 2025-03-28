import TodoListModel, { type TTodoList } from "./todolist";

export async function listItems() {
  const result = await TodoListModel.find();
  return result;
}

export async function createItem(todo: TTodoList) {
  const addedTodo = new TodoListModel(todo);
  return await addedTodo.save();
}

export async function updateItem(_id: string, todoChanges: TTodoList) {
  const updatedTodo = await TodoListModel.findByIdAndUpdate(
    { _id },
    todoChanges,
  );
  return updatedTodo;
}

export async function deleteItem(_id: string) {
  const deletedTodo = await TodoListModel.findByIdAndDelete({ _id });
  return deletedTodo;
}
