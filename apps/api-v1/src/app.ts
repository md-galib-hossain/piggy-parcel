import { AppConfig } from "@piggy/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import httpStatus from "http-status";
import express, { Application, Request, Response } from "express";
import { globalErrorHandler } from "./app/middlewares";
import router from "./app/routes";

const app: Application = express();
const corsOrigins = AppConfig.getInstance().security.corsOrigins;

app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(cookieParser());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "🚀 Piggy Parcel API v1 is running!",
    endpoints: {
      users: "/api/v1/consumer/users",
      health: "/api/v1/health"
    }
  });
});

app.use("/api/v1", router);
app.use(globalErrorHandler);

app.use((req: Request, res: Response) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "API not found!",
    error: {
      path: req.originalUrl,
      message: "Your requested path is not available",
    },
  });
});

export default app;
