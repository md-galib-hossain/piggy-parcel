import { Email, createEmailConfig } from "@piggy/email";
import { AppConfig } from "@piggy/config";

export function initializeEmailService() {
  const config = AppConfig.getInstance();
  
   Email.initialize(createEmailConfig({
    resendApiKey:AppConfig.getInstance().email.resendApiKey || "test-key",
    fromEmail: "noreply@galibhossain.dev",
    apiUrl: config.server.apiUrl || "http://localhost:5000",
    appName: "Piggy Parcel",
    primaryColor: "#4CAF50",
    logoUrl: "https://i.postimg.cc/sxJWbWSp/logoipsum-406.png"
  }));
  
  console.log("📧 Email service initialized successfully!");
}
