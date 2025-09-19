

import { Email, createEmailConfig } from '../src/index';

// ========================================
// Step 1: Initialize Email Service (One Time Setup)
// ========================================

const config = createEmailConfig({
  resendApiKey: "your-resend-api-key-here",
  fromEmail: "noreply@piggyparcel.com",
  apiUrl: "https://piggyparcel.com",
  appName: "Piggy Parcel",
  primaryColor: "#4CAF50",
  logoUrl: "https://piggyparcel.com/logo.png"
});

// Initialize the email service
Email.initialize(config);

// ========================================
// Step 2: Send Emails (Super Simple!)
// ========================================

export async function examples() {
  // Welcome email
  await Email.sendWelcomeEmail("user@example.com", {
    userName: "John Doe"
  });

  // Password reset email
  await Email.sendPasswordResetEmail("user@example.com", {
    userName: "John Doe",
    resetLink: "https://piggyparcel.com/reset-password?token=abc123"
  });

  // Delivery update
  await Email.sendDeliveryUpdateEmail("customer@example.com", {
    userName: "Jane Smith",
    trackingNumber: "PP123456789",
    status: "Out for Delivery",
    estimatedDelivery: "Today by 6:00 PM"
  });

  // Bulk emails
  await Email.sendBulkEmail("welcome", 
    ["user1@example.com", "user2@example.com"], 
    { userName: "New User" }
  );

  // Personalized bulk emails
  await Email.sendPersonalizedBulkEmail("welcome", [
    { to: "john@example.com", data: { userName: "John Doe" } },
    { to: "jane@example.com", data: { userName: "Jane Smith" } }
  ]);
}

console.log("🎉 Clean Email API is ready!");
console.log("📧 Usage: Email.sendWelcomeEmail(to, data)");
