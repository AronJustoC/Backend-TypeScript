import TodoRepository from "../repository/todo-list.repository";
import type { CreateTodoDto } from "../repository/todo-list.repository";

class TodoService {
  async getAll(user_id: string) {
    return TodoRepository.findAll(user_id);
  }

  async getById(_id: string) {
    return TodoRepository.findById(_id);
  }

  async create(createDTO: CreateTodoDto) {
    return TodoRepository.create(createDTO);
  }

  async update(_id: string, user: string, updateDTO: Partial<CreateTodoDto>) {
    return TodoRepository.update(_id, user, updateDTO);
  }

  async remove(_id: string, user: string) {
    return TodoRepository.delete(_id, user);
  }
}

const todoService = new TodoService();

export default todoService;
