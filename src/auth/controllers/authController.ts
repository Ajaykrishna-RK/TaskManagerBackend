import { Request, Response } from "express";
import { loginUseCase, registerUseCase } from "../usecases/authUseCase";
import { LoginBody, RegisterBody } from "../../types/auth/authTypes";



export const register = async (
  req: Request<{}, {}, RegisterBody>,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    const result = await registerUseCase(name, email, password);
    return res.status(result.status).json(result);

  } catch (error) {
    console.error("Register Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Controller Error",
    });
  }
};

export const login = async (
  req: Request<{}, {}, LoginBody>,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const result = await loginUseCase(email, password);
    return res.status(result.status).json(result);

  } catch (error) {
    console.error("Login Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Controller Error",
    });
  }
};
