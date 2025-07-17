import TodoModel from "../schemas/todo-list.schema";

export interface CreateTodoDto {
  title: string;
  description: string;
  done: boolean;
  user?: string;
}

class TodoRepository {
  async create(todo: CreateTodoDto) {
    const addedTodo = new TodoModel(todo);
    return await addedTodo.save();
  }

  async getCountItems(user: string) {
    const result = await TodoModel.find({
      user,
      archived: false,
    }).countDocuments();
    return result;
  }

  async findAll(user: string, page: number) {
    const result = await TodoModel.find({ user, archived: false })
      .populate("user")
      .skip(page * 10)
      .limit(10)
      .exec();
    return result;
  }

  async findById(_id: string) {
    const todo = await TodoModel.findOne({ _id, archived: false });
    return todo;
  }

  async update(_id: string, user: string, todoChanges: Partial<CreateTodoDto>) {
    const updatedTodo = await TodoModel.findByIdAndUpdate(
      { _id, user },
      { $set: todoChanges },
      { new: true },
    );
    return updatedTodo;
  }

  async delete(_id: string, user: string) {
    await TodoModel.findOneAndUpdate({ _id, user }, { archived: true });
  }
}

const todoRepository = new TodoRepository();

export default todoRepository;
