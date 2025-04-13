import UserRepository from "../repository/user.repository";
import { encrypt, compare } from "../utils/encrypt.util";
import { Sign } from "../utils/jwt.util";
import type { CreateUserDto } from "../repository/user.repository";

class UserService {
  async getAll() {
    return UserRepository.findAll();
  }

  async getById(_id: string) {
    return UserRepository.findById(_id);
  }

  async create(createDTO: CreateUserDto) {
    const hashedPassword = await encrypt(createDTO.password);
    return UserRepository.create({ ...createDTO, password: hashedPassword });
  }

  async update(_id: string, updateDTO: Partial<CreateUserDto>) {
    return UserRepository.update(_id, updateDTO);
  }

  async remove(_id: string) {
    return UserRepository.delete(_id);
  }

  async getTodosByUser(user: string) {
    return UserRepository.getTodosByUser(user);
  }

  async login(email: string, password: string) {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      throw new Error("user not found");
    }
    const correct = await compare(password, user.password ?? "");
    if (!correct) {
      throw new Error("incorrect password");
    }

    const token = await Sign({
      _id: user._id.toString() ?? "",
      email: user.email ?? "",
    });
    return token;
  }

  async refreshToken(user: { _id: string; email: string }) {
    try {
      const token = await Sign(user);
      console.log(token);
      return token;
    } catch (error) {
      console.log(error);
    }
  }
}

const userService = new UserService();

export default userService;
