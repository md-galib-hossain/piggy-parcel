import { AppConfig } from "../../appConfig";
import { BaseEmailTemplate } from "./BaseEmailTemplate";


export class WelcomeTemplate extends BaseEmailTemplate {
  render(data: { userName: string }): { subject: string; html: string } {
    const { userName } = data;
    const subject = `Welcome to ${this.appName}!`;
    const html = `
      ${this.getHeader()}
      <div style="padding: 20px; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Welcome, ${userName}!</h2>
        <p>Thank you for joining ${this.appName}. We're excited to have you on board!</p>
        <p>Get started by exploring our features or contacting our support team.</p>
        <a href="${AppConfig.getInstance().server.apiUrl}" style="display: inline-block; padding: 10px 20px; background-color: ${this.primaryColor}; color: white; text-decoration: none; border-radius: 5px;">Explore Now</a>
      </div>
      ${this.getFooter()}
    `;
    return { subject, html };
  }
}
