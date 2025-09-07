import { AppConfig } from "../../appConfig";
import { EmailTemplate } from "../../emailConfig";

export abstract class BaseEmailTemplate implements EmailTemplate {
  protected appName: string;
  protected primaryColor: string;
  protected logoUrl: string;

  constructor() {
    this.appName = "Piggy App";
    this.primaryColor = "#4CAF50"; 
    this.logoUrl = AppConfig.getInstance().server.apiUrl + "/logo.png"; 
  }

  // Common header for all emails
  protected getHeader(): string {
    return `
      <div style="background-color: ${this.primaryColor}; padding: 20px; text-align: center;">
        <img src="${this.logoUrl}" alt="${this.appName} Logo" style="max-width: 150px;" />
        <h1 style="color: white; margin: 0;">${this.appName}</h1>
      </div>
    `;
  }

  // Common footer for all emails
  protected getFooter(): string {
    return `
      <div style="background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #666;">
        <p>&copy; ${new Date().getFullYear()} ${this.appName}. All rights reserved.</p>
        <p><a href="${AppConfig.getInstance().server.apiUrl}" style="color: ${this.primaryColor}; text-decoration: none;">Visit our website</a></p>
      </div>
    `;
  }

  abstract render(data: any): { subject: string; html: string };
}