/**
 * Clean and easy-to-use Email class with static methods
 * Usage: Email.sendWelcomeEmail(to, userData)
 */

import { sendEmail, initializeEmailService } from "./service/email.service";
import { EmailServiceConfig } from "./index";
import { AccountVerificationLinkData } from "./templates/AccountVerificationLink";

export interface EmailOptions {
  cc?: string[];
  bcc?: string[];
  attachments?: { path: string; name?: string }[];
}

export interface WelcomeEmailData {
  userName: string;
}

export interface PasswordResetEmailData {
  userName: string;
  resetLink: string;
}

export interface DeliveryUpdateEmailData {
  userName: string;
  trackingNumber: string;
  status: string;
  estimatedDelivery?: string;
}

export interface OrderConfirmationEmailData {
  customerName: string;
  orderNumber: string;
  items: Array<{
    name: string;
    quantity: number;
    price: string;
  }>;
}

export class Email {
  private static isInitialized = false;

  /**
   * Initialize the email service - call this once at app startup
   */
  static initialize(config: EmailServiceConfig): void {
    initializeEmailService(config);
    this.isInitialized = true;
  }

  /**
   * Check if the email service is initialized
   */
  private static checkInitialization(): void {
    if (!this.isInitialized) {
      throw new Error(
        "Email service not initialized. Call Email.initialize(config) first."
      );
    }
  }

  /**
   * Send a welcome email to a new user
   */
  static async sendWelcomeEmail(
    to: string,
    data: WelcomeEmailData,
    options?: EmailOptions
  ): Promise<any> {
    this.checkInitialization();
    return sendEmail("welcome", to, data, options);
  }

  /**
   * Send a password reset email
   */
  static async sendPasswordResetEmail(
    to: string,
    data: PasswordResetEmailData,
    options?: EmailOptions
  ): Promise<any> {
    this.checkInitialization();
    return sendEmail("passwordReset", to, data, options);
  }

  /**
   * Send an account verification link email
   */
  static async sendAccountVerificationLink(
    to: string,
    data: AccountVerificationLinkData,
    options?: EmailOptions
  ): Promise<any> {
    this.checkInitialization();
    return sendEmail("emailVerification", to, data, options);
  }

  /**
   * Send a delivery update email
   */
  static async sendDeliveryUpdateEmail(
    to: string,
    data: DeliveryUpdateEmailData,
    options?: EmailOptions
  ): Promise<any> {
    this.checkInitialization();
    return sendEmail("deliveryUpdate", to, data, options);
  }

  /**
   * Send an order confirmation email (requires custom template registration)
   */
  static async sendOrderConfirmationEmail(
    to: string,
    data: OrderConfirmationEmailData,
    options?: EmailOptions
  ): Promise<any> {
    this.checkInitialization();
    return sendEmail("orderConfirmation", to, data, options);
  }

  /**
   * Generic method to send any registered template
   */
  static async sendCustomEmail(
    templateName: string,
    to: string,
    data: any,
    options?: EmailOptions
  ): Promise<any> {
    this.checkInitialization();
    return sendEmail(templateName, to, data, options);
  }

  /**
   * Send email to multiple recipients
   */
  static async sendBulkEmail(
    templateName: string,
    recipients: string[],
    data: any,
    options?: EmailOptions
  ): Promise<any[]> {
    this.checkInitialization();
    
    const promises = recipients.map(recipient =>
      sendEmail(templateName, recipient, data, options)
    );
    
    return Promise.all(promises);
  }

  /**
   * Send personalized emails to multiple recipients with different data
   */
  static async sendPersonalizedBulkEmail(
    templateName: string,
    recipientsWithData: Array<{ to: string; data: any }>,
    options?: EmailOptions
  ): Promise<any[]> {
    this.checkInitialization();
    
    const promises = recipientsWithData.map(({ to, data }) =>
      sendEmail(templateName, to, data, options)
    );
    
    return Promise.all(promises);
  }
}
