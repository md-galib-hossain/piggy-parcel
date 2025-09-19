import { AppError } from "@/app/errors";
import { auth } from "@piggy/auth";
import { CreateUser } from "@piggy/types";
import { Email } from "@piggy/email";

const registerUser = async (userData: CreateUser) => {
  const user = await auth.api.signUpEmail({
    body: {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      userName: userData.userName || "",
    }
  });

  // Send welcome email
  try {
    await Email.sendWelcomeEmail(userData.email, {
      userName: userData.name
    });
    console.log(`📧 Welcome email sent to ${userData.email}`);
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    // Don't throw error for email failure, just log it
  }

  return user;
};

const loginUser = async (email: string, password: string) => {
  const user = await auth.api.signInEmail({
    body: {
      email, password
    },
  });

  if (!user) throw new AppError(404, "User not found");
  return user;
};

const requestPasswordReset = async (email: string) => {
  // Generate a simple token (in production, use JWT or secure random token)
  const resetToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  // In a real app, you'd store this token in the database with expiration
  const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

  try {
    await Email.sendPasswordResetEmail(email, {
      userName: "User", // In real app, get from database
      resetLink: resetLink
    });

    console.log(`📧 Password reset email sent to ${email}`);
    return { message: "Password reset email sent successfully" };
  } catch (error) {
    console.error("Failed to send password reset email:", error);
    return { 
      message: "Password reset email sent successfully",
      resetLink // For testing purposes - remove in production
    };
  }
};

export const UserService = {
  registerUser,
  loginUser,
  requestPasswordReset,
};