import { user } from '@piggy/db';
import { auth } from "@piggy/auth";
import { AppConfig } from "@piggy/config";
import { db } from "@piggy/db";
import { eq } from 'drizzle-orm';
import { Email } from '@piggy/email';

export const bootstrapSuperAdmin = async () => {
  try {
    const config = AppConfig.getInstance();
    const email = config.superAdmin.email;

    console.log("Bootstrapping superAdmin...");

    // check if user exists
    const [existingUser] = await db
      .select()
      .from(user)
      .where(eq(user.email, email))
      .limit(1);

    if (existingUser) {
      // if SUPERADMIN not included, append it
      if (existingUser.role !== "SUPERADMIN") {
        await db
          .update(user)
          .set({role:"SUPERADMIN"})
          .where(eq(user.email, email));

        console.log("🔑 Updated existing user with SUPERADMIN role");
      } else {
        console.log("✅ Superadmin already exists");
      }
    } else {
      await auth.api.createUser({
        body: {
          email: config.superAdmin.email,
          password: config.superAdmin.password,
          name: config.superAdmin.name,
          role: "SUPERADMIN", 
        },
      });

      console.log("🚀 Superadmin created successfully");
    }

    // send welcome email
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
