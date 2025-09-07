import express from "express";
import { UserController } from "./user.controller";
import { validateRequest } from "@/app/middlewares";
import { createUserSchema, loginSchema } from "@piggy/validations";

const userRoutes: express.Router = express.Router();

const { registerUser, loginUser } = UserController;

userRoutes.post("/register", validateRequest(createUserSchema), registerUser);
userRoutes.post("/login", validateRequest(loginSchema), loginUser);
export default userRoutes;
