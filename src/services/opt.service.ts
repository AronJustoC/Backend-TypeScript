import otpRepository from "../repository/opt.repository";
import { encrypt } from "../utils/encrypt.util";
import EmailService from "./email.service";

class OtpService {
  async get(email: string) {
    return otpRepository.find(email);
  }

  genereCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }

  async create(email: string) {
    try {
      const code = this.genereCode().toString();
      const encryptedCode = await encrypt(code);
      await otpRepository.create({ email, code: encryptedCode });

      const body = `<h1>Hola ${email}</h1><p>Tu código de verificación es: ${code}</p>`;
      await EmailService.sendEmail(email, body);
    } catch (error) {
      throw new Error(error as string);
    }
  }
}

const otpService = new OtpService();

export default otpService;
