// src/useCases/authUseCases.ts
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/userModel/User";


export const registerUseCase = async (name: string, email: string, password: string) => {
  try {
    const exists = await User.findOne({ email });
    if (exists) {
      return { status: 409, success: false, message: "Email already exists" };
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });

    return { status: 201, success: true, message: "User Registered", user };
  } catch (error) {
    console.error("Register UseCase Error:", error);
    return { status: 500, success: false, message: "Server Error", error };
  }
};

export const loginUseCase = async (email: string, password: string) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return { status: 404, success: false, message: "User not found" };
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return { status: 401, success: false, message: "Invalid Password" };
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return {
      status: 200,
      success: true,
      message: "Login Success",
      token,
      user,
    };
  } catch (error) {
    console.error("Login UseCase Error:", error);
    return { status: 500, success: false, message: "Server Error", error };
  }
};
