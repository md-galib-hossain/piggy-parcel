import { db, user } from '@piggy/db';
import { AppConfig } from '@piggy/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import httpStatus from 'http-status';
import express, { Application, NextFunction, Request, Response } from 'express'
const app :Application= express();
const corsOrigins = AppConfig.getInstance().security.corsOrigins;
app.use(cors({ origin: corsOrigins, credentials: true }));
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users",async(req,res)=>{
  const users = await db.select().from(user)
  res.status(httpStatus.OK).json({
    success: true,
    data: users,
  })
})

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.use((req: Request, res: Response, next: NextFunction) => {
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