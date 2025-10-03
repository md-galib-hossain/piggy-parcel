import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, emailOTP } from "better-auth/plugins";
import { admin as adminPlugin } from "better-auth/plugins";
import { ac, roles } from "./permissions";
import { account, db, rateLimit, session, user, verification } from "@piggy/db";
import { AppConfig } from "@piggy/config";
import { Email } from "@piggy/email";
import { nextCookies } from "better-auth/next-js";
// Define the schema object for the adapter
const authSchema = {
  user,
  session,
  account,
  verification,
  rateLimit,
};
const webClientUrl = AppConfig.getInstance().clients.webClientUrl;
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  emailAndPassword: {
    
    enabled: true,
    requireEmailVerification: true,
    minPasswordLength: 6, // ← missing comma was here
    sendResetPassword: async ({ user, url, token }, request) => {
      const frontendResetUrl = `${webClientUrl}/reset-password`;
      const resetUrl = new URL(url);
      resetUrl.searchParams.set("callbackURL", frontendResetUrl);

      await Email.sendPasswordResetEmail(user.email, {
        userName: user.name,
        resetLink: resetUrl.toString(),
      });
    },
    
    
  },
emailVerification: {
    sendOnSignUp: true,
    expiresIn: 60 * 60,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url,token }) => {
            // const frontendRedirect = `${webClientUrl}/email-verified`;

      const link = new URL(url);
      link.searchParams.set("callbackURL", "/auth/verify");

    await Email.sendAccountVerificationLink(user.email, {
      userName: user.name,
      verificationLink: link.toString(),
    });
    },
  },
  user: {
    additionalFields: {
      userName: {
        type: "string",
        defaultValue: "",
        input: true,
      },
      role: {
        type: "string",
        input: false,
      },
    },
  },
  advanced: {
    cookiePrefix: "piggy-parcel",
  },
  rateLimit: {
    storage: "database",
    enabled: true,
    window: 60, // time window in seconds
    max: 100, // max requests in the window
    customRules: {
      "/two-factor/*": async (request) => {
        return {
          window: 10,
          max: 3,
        };
      },
    },
  },
  plugins: [
        nextCookies(),

    adminPlugin({
      defaultRole: "USER",
      adminRoles: ["ADMIN", "SUPERADMIN"],
      ac,
      roles,

      adminUserIds: [],
      defaultBanReason: "No reason",
      impersonationSessionDuration: 60 * 60 * 24,
    }),
    emailOTP({
      sendVerificationOnSignUp: true,
      otpLength: 6,
      expiresIn: 600,
      allowedAttempts: 5,
      overrideDefaultEmailVerification: true,
      async sendVerificationOTP({ email, otp, type }) {
        // Implement email sending logic here (e.g., using a service like Nodemailer)
        if (type === "sign-in") {
          console.log(`Sending sign-in OTP ${otp} to ${email}`);
          // Add email sending code here
        } else if (type === "email-verification") {
          console.log(`Sending verification OTP ${otp} to ${email}`);
          // Add email sending code here
        } else {
          console.log(`Sending password reset OTP ${otp} to ${email}`);
          // Add email sending code here
        }
      },
    }),
  ],
});
