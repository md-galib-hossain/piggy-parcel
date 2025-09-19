import { EmailTemplateFactory } from "../factory/EmailTemplateFactory";
import { PiggyParcelEmailBuilder } from "../builders/PiggyParcelEmailBuilder";
import { EmailServiceConfig } from "../index";
import { Resend } from "resend";

// Global config instance - will be set by the consumer
let emailConfig: EmailServiceConfig | null = null;
let isInitialized = false;

/**
 * Initialize the email service with configuration
 * This should be called once during application startup
 */
export function initializeEmailService(config: EmailServiceConfig): void {
  emailConfig = config;
  isInitialized = true;
}

/**
 * Check if the email service is initialized
 */
export function isEmailServiceInitialized(): boolean {
  return isInitialized;
}

/**
 * Get the current email configuration
 * Throws an error if the service hasn't been initialized
 */
function getEmailConfig(): EmailServiceConfig {
  if (!emailConfig) {
    throw new Error(
      "Email service not initialized. Call initializeEmailService() with your configuration first."
    );
  }
  return emailConfig;
}

export async function sendEmail(
  templateName: string,
  to: string,
  data: any,
  options?: {
    cc?: string[];
    bcc?: string[];
    attachments?: { path: string; name?: string }[];
  }
) {
  try {
    const config = getEmailConfig();
    
    if (!config.resendApiKey) {
      throw new Error("RESEND_API_KEY is required for email service.");
    }

    // Create template and builder
    const template = EmailTemplateFactory.createTemplate(templateName);
    const builder = new PiggyParcelEmailBuilder();
    
    // Build the email using template and builder pattern
    const emailBuilder = template.render(data, builder).addRecipient(to);
    
    // Add optional parameters
    if (options?.cc) {
      options.cc.forEach(ccEmail => emailBuilder.addCc(ccEmail));
    }
    
    if (options?.bcc) {
      options.bcc.forEach(bccEmail => emailBuilder.addBcc(bccEmail));
    }
    
    if (options?.attachments) {
      options.attachments.forEach(attachment => 
        emailBuilder.addAttachment(attachment.path, attachment.name)
      );
    }
    
    const email = emailBuilder.build();
    
    // Send email using Resend
    const resend = new Resend(config.resendApiKey);
    
    // Prepare email options
    const emailOptions: any = {
      from: config.emailFrom ?? "noreply@piggyparcel.com",
      to: email.to,
      subject: email.subject,
      html: email.html,
    };

    // Add optional fields only if they have values
    if (email.cc && email.cc.length > 0) {
      emailOptions.cc = email.cc;
    }
    
    if (email.bcc && email.bcc.length > 0) {
      emailOptions.bcc = email.bcc;
    }
    
    if (email.attachments && email.attachments.length > 0) {
      emailOptions.attachments = email.attachments
        .map(attachment => ({
          path: attachment.path,
          ...(attachment.name && { name: attachment.name })
        }));
    }

    const { data: response, error } = await resend.emails.send(emailOptions);

    if (error) throw error;
    return response;
  } catch (err) {
    console.error("Failed to send email:", err);
    throw err;
  }
}
