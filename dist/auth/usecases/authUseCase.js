"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUseCase = exports.registerUseCase = void 0;
// src/useCases/authUseCases.ts
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../../models/userModel/User"));
const registerUseCase = async (name, email, password) => {
    try {
        const exists = await User_1.default.findOne({ email });
        if (exists) {
            return { status: 409, success: false, message: "Email already exists" };
        }
        const hashed = await bcryptjs_1.default.hash(password, 10);
        const user = await User_1.default.create({ name, email, password: hashed });
        return { status: 201, success: true, message: "User Registered", user };
    }
    catch (error) {
        console.error("Register UseCase Error:", error);
        return { status: 500, success: false, message: "Server Error", error };
    }
};
exports.registerUseCase = registerUseCase;
const loginUseCase = async (email, password) => {
    try {
        const user = await User_1.default.findOne({ email });
        if (!user) {
            return { status: 404, success: false, message: "User not found" };
        }
        const match = await bcryptjs_1.default.compare(password, user.password);
        if (!match) {
            return { status: 401, success: false, message: "Invalid Password" };
        }
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        return {
            status: 200,
            success: true,
            message: "Login Success",
            token,
            user,
        };
    }
    catch (error) {
        console.error("Login UseCase Error:", error);
        return { status: 500, success: false, message: "Server Error", error };
    }
};
exports.loginUseCase = loginUseCase;
