import { EmailConfig } from "../../emailConfig";


export async function sendEmail(
  templateName: string,
  to: string,
  data: any
) {
  try {
    const response = await EmailConfig.getInstance().send(
      templateName,
      to,
      data
    );
    return response;
  } catch (err) {
    console.error("Failed to send email:", err);
    throw err;
  }
}
