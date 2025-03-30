import TodoRepository from "../repository/todo-list.schema";
import type { CreateTodoDto } from "../repository/todo-list.schema";

class TodoService {
  async getAll() {
    return TodoRepository.findAll();
  }

  async create(createDTO: CreateTodoDto) {
    return TodoRepository.create(createDTO);
  }

  async update(_id: string, updateDTO: Partial<CreateTodoDto>) {
    return TodoRepository.update(_id, updateDTO);
  }

  async remove(_id: string) {
    return TodoRepository.delete(_id);
  }
}

const todoService = new TodoService();

export default todoService;
