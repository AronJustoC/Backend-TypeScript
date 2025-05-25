import { Resend } from "resend";
import process from "process";

const resend = new Resend(process.env.RESEND_KEY);

class EmailService {
  async sendEmail(email: string, body: string) {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: [email],
      subject: "Codigo de verificación",
      html: body,
    });

    if (error) {
      console.log({ error });
      throw new Error(error.message);
    }
    return data;
  }
}

const emailService = new EmailService();

export default emailService;
