import UserModel from "../schemas/user.schema";
import TodoModel from "../schemas/todo-list.schema";

export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  active?: boolean;
  verified?: boolean;
}

class UserRepository {
  async create(user: CreateUserDto) {
    const addedUser = new UserModel(user);
    return await addedUser.save();
  }

  async findAll() {
    const result = await UserModel.find({ active: true });
    return result;
  }

  async findById(_id: string) {
    const user = await UserModel.findOne({ _id, active: true });
    return user;
  }

  async findByEmail(email: string) {
    const user = await UserModel.findOne({ email, active: true });
    return user;
  }

  async update(_id: string, userChanges: Partial<CreateUserDto>) {
    const updatedUser = await UserModel.findOneAndUpdate(
      { _id },
      { $set: userChanges },
      { new: true },
    );
    return updatedUser;
  }

  async delete(_id: string) {
    await UserModel.findOneAndUpdate({ _id }, { active: false });
  }

  async getTodosByUser(user: string) {
    return TodoModel.find({ user });
  }
}

const userRepository = new UserRepository();

export default userRepository;
