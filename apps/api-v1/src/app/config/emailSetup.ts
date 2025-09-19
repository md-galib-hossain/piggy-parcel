import { Email, createEmailConfig } from "@piggy/email";
import { AppConfig } from "@piggy/config";

export function initializeEmailService() {
  const config = AppConfig.getInstance();
  
   Email.initialize(createEmailConfig({
    resendApiKey:AppConfig.getInstance().email.resendApiKey || "test-key",
    fromEmail: "mdgalib23@gmail.com",
    apiUrl: config.server.apiUrl || "http://localhost:5000",
    appName: "Piggy Parcel",
    primaryColor: "#4CAF50",
    logoUrl: "https://piggyparcel.com/logo.png"
  }));
  
  console.log("📧 Email service initialized successfully!");
}
