// 🎉 Clean Email API - Simple and intuitive
export { Email } from "./Email";
export { createEmailConfig } from "./config/EmailConfig";

// TypeScript interfaces for email data
export type { 
  EmailOptions, 
  WelcomeEmailData, 
  PasswordResetEmailData, 
  DeliveryUpdateEmailData, 
  OrderConfirmationEmailData 
} from "./Email";

// Configuration interface
export interface EmailServiceConfig {
  resendApiKey: string;
  emailFrom: string;
  server: {
    apiUrl: string;
  };
}

// Advanced usage - for custom templates and extensions
export { EmailTemplateFactory } from "./factory/EmailTemplateFactory";
export { BaseEmailTemplate } from "./templates/BaseEmailTemplate";
export type { BaseTemplateConfig } from "./templates/BaseEmailTemplate";

// Built-in templates (if you want to extend them)
export { WelcomeTemplate } from "./templates/WelcomeTemplate";
export { PasswordResetTemplate } from "./templates/PasswordResetTemplate";
export { DeliveryUpdateTemplate } from "./templates/DeliveryUpdateTemplate";

// Internal interfaces (for advanced customization)
export type { EmailTemplate } from "./interfaces/EmailTemplate";
export type { EmailBuilder, Email as EmailInterface } from "./interfaces/EmailBuilder";
