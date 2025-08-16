import { AppConfig } from "@piggy/config";
import { createServer, Server } from "http";
import app from "./app";
import { db, user } from "@piggy/db";
import { eq } from "drizzle-orm";
const server: Server = createServer(app);

const unexpectedErrorHandler = (error: unknown) => {
  console.error("🔥 Unexpected Error: ", error);
  gracefulShutdown("Unexpected Error");
};

const gracefulShutdown = async (signal: string) => {
  console.log(`⚠️ ${signal} received. Shutting down gracefully...`);
  await exitHandler();
  process.exit(0);
};

const exitHandler = async () => {
  return new Promise<void>((resolve) => {
    server.close(async () => {
      console.log("💀 Server closed gracefully");
      resolve();
    });
  });
};
async function main() {
  try {
    const config = AppConfig.getInstance();
    const port = config.server.port;
    const apiUrl = config.server.apiUrl;
    const seedUser = {
      id: "1",
      name: "Galib",
      emailVerified: false,
      image: "",
    };

    const existing = await db.select().from(user).where(eq(user.name, "Galib"));
    if (existing.length === 0) {
      await db.insert(user).values(seedUser);
      console.log("User seeded!");
    } else {
      console.log("User already exists, skipping...");
    }
    server.listen(port, () => {
      console.log(`🚀 Server listening on port ${port}`);
      console.log(`API URL: ${apiUrl}`);
      console.log(`CORS Origins: ${config.security.corsOrigins.join(", ")}`);
    });
    process.on("uncaughtException", unexpectedErrorHandler);
    process.on("unhandledRejection", unexpectedErrorHandler);
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
  } catch (error) {
    console.error("❌ Failed to start server: ", error);
    process.exit(1);
  }
}

main();
