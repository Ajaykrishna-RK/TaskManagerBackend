import { Request, Response } from "express";
import {
  getTasksUseCase,
  updateTaskUseCase,
  deleteTaskUseCase,
  createTaskUseCase,
  taskTestUseCase,
  getDashboardStatsUseCase,
} from "../usecases/taskUseCase";
import { AuthRequest } from "../../types/express/type";

export const testTask = async (req: Request, res: Response) => {
  try {
    const result = await taskTestUseCase();
    return res.json(result);
  } catch (error) {
    console.error("Create Task Controller Error:", error);
    return res.status(500).json({
      success: false,
      message: "Controller Error (Create Task)",
    });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const result = await createTaskUseCase(req.userId!, req.body);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error("Create Task Controller Error:", error);
    return res.status(500).json({ success: false });
  }
};

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;
    const result = await getTasksUseCase(userId, req.query);
    return res.status(result.status).json(result);
  } catch (error) {
    console.error("Get Tasks Controller Error:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const result = await updateTaskUseCase(
      req.userId!,
      req.params.id,
      req.body
    );
    return res.status(result.status).json(result);
  } catch {
    return res.status(500).json({ success: false });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const result = await deleteTaskUseCase(req.userId!, req.params.id);
    return res.status(result.status).json(result);
  } catch {
    return res.status(500).json({ success: false });
  }
};

export const getDashboardStats = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId!;

    const result = await getDashboardStatsUseCase(userId);

    return res.status(result.status).json(result);
  } catch (error) {
    console.error("Dashboard Stats Controller Error:", error);

    return res.status(500).json({
      success: false,
      status: 500,
      message: "Failed to fetch dashboard stats",
    });
  }
};
