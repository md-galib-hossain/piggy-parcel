import { BaseEmailTemplate } from "./BaseEmailTemplate";

export class PasswordResetTemplate extends BaseEmailTemplate {
  render(data: { resetLink: string; userName: string }): { subject: string; html: string } {
    const { resetLink, userName } = data;
    const subject = `Reset Your ${this.appName} Password`;
    const html = `
      ${this.getHeader()}
      <div style="padding: 20px; font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2>Password Reset Request</h2>
        <p>Hi ${userName},</p>
        <p>We received a request to reset your password. Click the button below to reset it:</p>
        <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: ${this.primaryColor}; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If you didn't request a password reset, please ignore this email.</p>
        <p>This link will expire in 24 hours.</p>
      </div>
      ${this.getFooter()}
    `;
    return { subject, html };
  }
}