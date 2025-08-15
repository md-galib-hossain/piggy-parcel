import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { z } from "zod";

// 1️⃣ Load correct .env file based on NODE_ENV
const NODE_ENV = process.env.NODE_ENV || "development";
const envFile = `.env.${NODE_ENV}`;

// Resolve file path
const envPath = path.resolve(process.cwd(), envFile);

// Fallback to .env if specific file not found
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  dotenv.config();
}

// 2️⃣ Define schema for environment variables
const envSchema = z.object({
  NODE_ENV: z.enum(["development", "staging", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().url(),
  DB_POOL_SIZE: z.coerce.number().int().positive().optional(),
  API_URL: z.string().url().optional(),
  CORS_ORIGINS: z.string().optional(),
});

// 3️⃣ Parse & validate env
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

interface AppConfigOptions {
  database: DatabaseConfig;
  security: SecurityConfig;
  server: ServerConfig;
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
}
