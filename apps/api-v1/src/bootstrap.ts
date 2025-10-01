import { user } from '@piggy/db';
// src/bootstrap.ts
import { auth } from "@piggy/auth"; // your BetterAuth instance
import { AppConfig } from "@piggy/config";
import { db } from "@piggy/db";
import { eq } from 'drizzle-orm';
import { Email } from '@piggy/email';

export const bootstrapSuperAdmin = async () => {
  try {
    const config = AppConfig.getInstance();
    const email = config.superAdmin.email;

    // Check if superAdmin already exists
const existingUser = await db
        .select()
        .from(user)
        .where(eq(user.email, email))
        .limit(1);
    if (existingUser[0] && existingUser[0].role === "SUPERADMIN") {
      console.log("✅ Superadmin already exists");
      return;
    }

 
    const newUser = await auth.api.createUser({
    body: {
        email: config.superAdmin.email, 
        password: config.superAdmin.password, 
        name: config.superAdmin.name, 
        role: ["SUPERADMIN"],
        
    },
});

    console.log("🚀 Superadmin created successfully");

    // Optional: send welcome email
    try {
      await Email.sendWelcomeEmail(email, {
        userName: config.superAdmin.name,
      });
      console.log(`📧 Welcome email sent to ${email}`);
    } catch (err) {
      console.error("Failed to send welcome email:", err);
    }
  } catch (error) {
    console.error("❌ Failed to bootstrap superAdmin:", error);
  }



};
