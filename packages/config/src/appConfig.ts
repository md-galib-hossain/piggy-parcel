import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { z } from "zod";

// Load correct .env file based on NODE_ENV
const NODE_ENV = process.env.NODE_ENV || "development";
const ROOT_DIR = path.resolve(__dirname, "../../../"); 
const envFile = `.env.${NODE_ENV}`;
const envPath = path.join(ROOT_DIR, envFile);

// Load .env
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  // fallback to .env at repo root
  const fallbackEnv = path.join(ROOT_DIR, ".env");
  if (fs.existsSync(fallbackEnv)) {
    dotenv.config({ path: fallbackEnv });
  } else {
    console.warn("No .env file found at root or for current environment.");
  }
}
// Define schema for environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "staging", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().url(),
  DB_POOL_SIZE: z.coerce.number().int().positive().optional(),
  API_URL: z.string().url().optional(),
  CORS_ORIGINS: z.string().optional(),
  SMTP_HOST: z.string().min(1, "SMTP_HOST is required").optional(),
  SMTP_PORT: z.coerce.number().int().positive().default(587).optional(),
  SMTP_USER: z.string().min(1, "SMTP_USER is required").optional(),
  SMTP_PASS: z.string().min(1, "SMTP_PASS is required").optional(),
  EMAIL_FROM: z.email("EMAIL_FROM must be a valid email").optional(),
});

// Parse & validate env
const env = envSchema.parse(process.env);

// Interfaces for structured config
interface DatabaseConfig {
  url: string;
  poolSize?: number | undefined;
}

interface SecurityConfig {
  corsOrigins: string[];
}

interface ServerConfig {
  port: number;
  apiUrl: string;
}

interface EmailConfig {
  smtpHost?: string | undefined;
  smtpPort?: number | undefined;
  smtpUser?: string | undefined;
  smtpPass?: string | undefined;
  emailFrom?: string | undefined;
}
interface AppConfigOptions {
  database: DatabaseConfig;
  security: SecurityConfig;
  server: ServerConfig;
  email: EmailConfig;
}

type Environment = "development" | "staging" | "production";

// Singleton AppConfig
export class AppConfig {
  private static instance: AppConfig;
  private readonly config: AppConfigOptions;

  static getInstance(): AppConfig {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }

  private constructor() {
    this.config = this.loadOptions();
  }

  private loadOptions(): AppConfigOptions {
    return {
      database: {
        url: env.DATABASE_URL,
        poolSize: env.DB_POOL_SIZE,
      },
      security: {
        corsOrigins: this.parseCorsOrigins(),
      },
      server: {
        port: env.PORT,
        apiUrl: env.API_URL ?? `http://localhost:${env.PORT}`,
      },
      email: {
        smtpHost: env.SMTP_HOST,
        smtpPort: env.SMTP_PORT,
        smtpUser: env.SMTP_USER,
        smtpPass: env.SMTP_PASS,
        emailFrom: env.EMAIL_FROM,
      },
    };
  }

  private parseCorsOrigins(): string[] {
    const origins = env.CORS_ORIGINS ?? "*";
    return origins === "*"
      ? ["*"]
      : origins.split(",").map((origin) => origin.trim());
  }

  get environment(): Environment {
    return env.NODE_ENV;
  }
  get isDevelopment(): boolean {
    return env.NODE_ENV === "development";
  }
  get isStaging(): boolean {
    return env.NODE_ENV === "staging";
  }
  get isProduction(): boolean {
    return env.NODE_ENV === "production";
  }
  get database(): DatabaseConfig {
    return this.config.database;
  }
  get security(): SecurityConfig {
    return this.config.security;
  }
  get server(): ServerConfig {
    return this.config.server;
  }
  get email(): EmailConfig {
  return this.config.email;
}
}
