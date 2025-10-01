ALTER TABLE "user" DROP CONSTRAINT "user_email_unique";--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "email_role_unique" UNIQUE("email","role");