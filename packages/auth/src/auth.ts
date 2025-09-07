import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, emailOTP } from "better-auth/plugins";
import { account, db, rateLimit, session, user, verification } from "@piggy/db"

// Define the schema object for the adapter
const authSchema = {
  user,
  session,
  account,
  verification,
  rateLimit,
};

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: authSchema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      userName: {
        type: "string",
        defaultValue: "",
        input: true,
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
    admin({
      
      adminRoles: ["admin", "superadmin"],
      adminUserIds: [],
      defaultRole: "user",
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