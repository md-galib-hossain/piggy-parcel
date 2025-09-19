# 📧 Piggy Parcel Email System

A clean, simple email system with an intuitive static API.

## ✨ Quick Start

### 1. Initialize (One-time setup)
```typescript
import { Email, createEmailConfig } from '@piggy/email';

// Initialize the email service (do this once at app startup)
const config = createEmailConfig({
  resendApiKey: process.env.RESEND_API_KEY!,
  fromEmail: "noreply@piggyparcel.com",
  apiUrl: "https://piggyparcel.com",
  appName: "Piggy Parcel",
  primaryColor: "#4CAF50",
  logoUrl: "https://piggyparcel.com/logo.png"
});

Email.initialize(config);
```

### 2. Send Emails (Super Simple!)
```typescript
// Send welcome email
await Email.sendWelcomeEmail("user@example.com", {
  userName: "John Doe"
});

// Send password reset email
await Email.sendPasswordResetEmail("user@example.com", {
  userName: "John Doe",
  resetLink: "https://piggyparcel.com/reset?token=abc123"
});

// Send delivery update
await Email.sendDeliveryUpdateEmail("customer@example.com", {
  userName: "Jane Smith",
  trackingNumber: "PP123456789",
  status: "Out for Delivery",
  estimatedDelivery: "Today by 6:00 PM"
});
```

## 🚀 Bulk Emails
```typescript
// Send same email to multiple recipients
await Email.sendBulkEmail("welcome", 
  ["user1@example.com", "user2@example.com"], 
  { userName: "New User" }
);

// Send personalized emails
await Email.sendPersonalizedBulkEmail("welcome", [
  { to: "john@example.com", data: { userName: "John Doe" } },
  { to: "jane@example.com", data: { userName: "Jane Smith" } }
]);
```

## 📝 Available Methods

| Method | Description |
|--------|-------------|
| `Email.initialize(config)` | One-time setup (required) |
| `Email.sendWelcomeEmail(to, data)` | Send welcome email |
| `Email.sendPasswordResetEmail(to, data)` | Send password reset |
| `Email.sendDeliveryUpdateEmail(to, data)` | Send delivery update |
| `Email.sendCustomEmail(template, to, data)` | Send any registered template |
| `Email.sendBulkEmail(template, recipients, data)` | Bulk send to multiple recipients |
| `Email.sendPersonalizedBulkEmail(template, recipientsData)` | Send personalized bulk emails |

## 🔧 Configuration Options

```typescript
const config = createEmailConfig({
  resendApiKey: "your-api-key",      // Required
  apiUrl: "https://yourapp.com",     // Required
  fromEmail: "noreply@yourapp.com",  // Optional, defaults to "noreply@piggyparcel.com"
  appName: "Your App",               // Optional, defaults to "Piggy Parcel"
  primaryColor: "#your-color",       // Optional, defaults to "#4CAF50"
  logoUrl: "https://yourapp.com/logo.png"  // Optional
});
```

## 📦 Example Usage in Your App

```typescript
// app/config/email.ts
import { Email, createEmailConfig } from '@piggy/email';

export function setupEmail() {
  Email.initialize(createEmailConfig({
    resendApiKey: process.env.RESEND_API_KEY!,
    fromEmail: process.env.EMAIL_FROM!,
    apiUrl: process.env.APP_URL!,
    appName: "Your App Name"
  }));
}

// app/services/user.ts  
import { Email } from '@piggy/email';

export async function registerUser(userData: any) {
  // ... user registration logic
  
  // Send welcome email (that's it!)
  await Email.sendWelcomeEmail(userData.email, {
    userName: userData.name
  });
}
```

## 🎨 Custom Templates

```typescript
import { BaseEmailTemplate, EmailTemplateFactory } from '@piggy/email';

// Create custom template
class OrderConfirmationTemplate extends BaseEmailTemplate {
  render(data: any, builder: EmailBuilder): EmailBuilder {
    return this.buildEmail(data, builder);
  }

  protected getEmailContent(data: any): { subject: string; bodyHtml: string } {
    return {
      subject: `Order Confirmed - ${data.orderNumber}`,
      bodyHtml: `<h1>Thank you ${data.customerName}!</h1>`
    };
  }
}

// Register custom template
EmailTemplateFactory.registerTemplate("orderConfirmation", 
  (config) => new OrderConfirmationTemplate(config)
);

// Use custom template
await Email.sendCustomEmail("orderConfirmation", "customer@example.com", {
  orderNumber: "ORD-12345",
  customerName: "Alice Johnson"
});
```

---

**Simple, clean, and powerful! 🎉**
