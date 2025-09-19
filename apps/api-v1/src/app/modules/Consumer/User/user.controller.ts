import catchAsync from "@/app/utils/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "@/app/utils/sendResponse";

const registerUser = catchAsync(async (req, res) => {
    const result = await UserService.registerUser(req.body);

    sendResponse(res, {
        data: result,
        message: "User registered successfully",
        statusCode: 201,
    });
});

const loginUser = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const result = await UserService.loginUser(email, password);

    sendResponse(res, {
        data: result,
        message: "User logged in successfully",
        statusCode: 200,
    });
});

const requestPasswordReset = catchAsync(async (req, res) => {
    const { email } = req.body;
    const result = await UserService.requestPasswordReset(email);

    sendResponse(res, {
        data: result,
        message: "Password reset email sent successfully",
        statusCode: 200,
    });
});

export const UserController = {
    registerUser,
    loginUser,
    requestPasswordReset,
};