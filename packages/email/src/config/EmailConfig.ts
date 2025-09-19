/**
 * Simple email configuration setup
 */

import { EmailServiceConfig } from "../index";
import { BaseTemplateConfig } from "../templates/BaseEmailTemplate";
import { EmailTemplateFactory } from "../factory/EmailTemplateFactory";

/**
 * Quick setup function for email configuration
 */
export function createEmailConfig(options: {
  resendApiKey: string;
  fromEmail?: string;
  apiUrl: string;
  appName?: string;
  primaryColor?: string;
  logoUrl?: string;
}): EmailServiceConfig {
  // Set global template configuration
  const templateConfig: BaseTemplateConfig = {
    apiUrl: options.apiUrl,
    appName: options.appName || "Piggy Parcel",
    primaryColor: options.primaryColor || "#4CAF50"
  };

  if (options.logoUrl) {
    templateConfig.logoUrl = options.logoUrl;
  }

  EmailTemplateFactory.setGlobalConfig(templateConfig);

  return {
    resendApiKey: options.resendApiKey,
    emailFrom: options.fromEmail || "noreply@piggyparcel.com",
    server: {
      apiUrl: options.apiUrl
    }
  };
}
