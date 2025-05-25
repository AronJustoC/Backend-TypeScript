import OtpModel from "../schemas/otp.schema";

interface CreateOptDto {
  email: string;
  code: string;
}

class OtpRepository {
  async create(todo: CreateOptDto) {
    return await OtpModel.findOneAndUpdate(
      { email: todo.email },
      { code: todo.code, createdAt: new Date() },
      { upsert: true, new: true },
    );
  }
  async find(email: string) {
    const addedOtp = await OtpModel.findOne({ email });
    if (!addedOtp) {
      throw new Error("Code not found");
    }
    return addedOtp;
  }
}

const otpRepository = new OtpRepository();

export default otpRepository;
