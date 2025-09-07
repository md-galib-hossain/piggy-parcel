import { AppConfig } from "./appConfig";

import { PasswordResetTemplate } from "./email/templates/PasswordResetTemplate";
import { WelcomeTemplate } from "./email/templates/WelcomeTemplate";
import { Resend } from "resend";
export interface EmailTemplate {
  render(data: any): { subject: string; html: string };
}
export class EmailConfig {
  private static instance: EmailConfig;

  private resendClient: Resend;
  private from: string;
  private templates: Map<string, EmailTemplate>;

  private constructor() {
    const appConfig = AppConfig.getInstance();

    if (!appConfig.email.resendApiKey) {
      throw new Error("RESEND_API_KEY is required for email service.");
    }

    this.resendClient = new Resend(appConfig.email.resendApiKey);
    this.from = appConfig.email.emailFrom ?? "noreply@example.com";

    // Initialize templates
    this.templates = new Map<string, EmailTemplate>([
      ["welcome", new WelcomeTemplate()],
      ["passwordReset", new PasswordResetTemplate()],
      // Add more templates here
    ]);
  }

  static getInstance(): EmailConfig {
    if (!EmailConfig.instance) {
      EmailConfig.instance = new EmailConfig();
    }
    return EmailConfig.instance;
  }

  getTemplate(name: string): EmailTemplate | undefined {
    return this.templates.get(name);
  }

  addTemplate(name: string, template: EmailTemplate) {
    this.templates.set(name, template);
  }

  async send(templateName: string, to: string, data: any) {
    const template = this.getTemplate(templateName);
    if (!template) throw new Error(`Email template "${templateName}" not found.`);

    const { subject, html } = template.render(data);

    const { data: response, error } = await this.resendClient.emails.send({
      from: this.from,
      to: [to],
      subject,
      html,
    });

    if (error) throw error;

    return response;
  }
}
