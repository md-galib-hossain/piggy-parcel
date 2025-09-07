import { AppConfig } from "./appConfig";
import { PasswordResetTemplate } from "./email/templates/PasswordResetTemplate";
import { WelcomeTemplate } from "./email/templates/WelcomeTemplate";

export interface EmailTemplate {
  render(data: any): { subject: string; html: string };
}

interface EmailConfigOptions {
  smtp: {
    host: string;
    port: number;
    auth: {
      user: string;
      pass: string;
    };
  };
  from: string;
  templates: Map<string, EmailTemplate>;
}

export class EmailConfig {
  private static instance: EmailConfig;
  private readonly config: EmailConfigOptions;

  static getInstance(): EmailConfig {
    if (!EmailConfig.instance) {
      EmailConfig.instance = new EmailConfig();
    }
    return EmailConfig.instance;
  }

  private constructor() {
    this.config = this.loadConfig();
  }

  private loadConfig(): EmailConfigOptions {
    const appConfig = AppConfig.getInstance();

    if (!appConfig.email.smtpHost || !appConfig.email.smtpUser || !appConfig.email.smtpPass || !appConfig.email.emailFrom) {
      throw new Error("Missing required SMTP configuration. Please check your environment variables.");
    }

    const templates = new Map<string, EmailTemplate>();
    templates.set("passwordReset", new PasswordResetTemplate());
    templates.set("welcome", new WelcomeTemplate());

    return {
      smtp: {
        host: appConfig.email.smtpHost,
        port: appConfig.email.smtpPort ?? 587,
        auth: {
          user: appConfig.email.smtpUser,
          pass: appConfig.email.smtpPass,
        },
      },
      from: appConfig.email.emailFrom,
      templates,
    };
  }

  get smtp() {
    return this.config.smtp;
  }

  get from() {
    return this.config.from;
  }

  getTemplate(name: string): EmailTemplate | undefined {
    return this.config.templates.get(name);
  }

  addTemplate(name: string, template: EmailTemplate): void {
    this.config.templates.set(name, template);
  }
}
