"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const authUseCase_1 = require("../usecases/authUseCase");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const result = await (0, authUseCase_1.registerUseCase)(name, email, password);
        return res.status(result.status).json(result);
    }
    catch (error) {
        console.error("Register Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Controller Error",
        });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await (0, authUseCase_1.loginUseCase)(email, password);
        return res.status(result.status).json(result);
    }
    catch (error) {
        console.error("Login Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Controller Error",
        });
    }
};
exports.login = login;
