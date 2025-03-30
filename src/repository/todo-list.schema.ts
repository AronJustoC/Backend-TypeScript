import TodoModel from "../schemas/todo-list.schema";

export interface CreateTodoDto {
  title: string;
  description: string;
  done: boolean;
}

class TodoRepository {
  async create(todo: CreateTodoDto) {
    const addedTodo = new TodoModel(todo);
    return await addedTodo.save();
  }

  async findAll() {
    const result = await TodoModel.find({ archived: false });
    return result;
  }

  static async findById(id: string) {
    const todo = await TodoModel.findById(id, { archived: false });
    return todo;
  }

  async update(_id: string, todoChanges: Partial<CreateTodoDto>) {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      { _id },
      { $set: todoChanges },
      { new: true },
    );
    return updatedTodo;
  }

  async delete(_id: string) {
    const deletedTodo = await TodoModel.findOneAndUpdate(
      { _id },
      { archived: true },
    );
    return deletedTodo;
  }
}

const todoRepository = new TodoRepository();

export default todoRepository;
