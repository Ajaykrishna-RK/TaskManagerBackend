import { Types } from "mongoose";
import Task from "../../models/taskModel/Task";

export const taskTestUseCase = async () => {
  try {
    return {
      success: true,
      status: 201,
      data: "Test Api Working",
    };
  } catch (err) {
    console.log(err);
  }
};

export const createTaskUseCase = async (userId: string, data: any) => {
  try {
    const newTask = await Task.create({
      ...data,
      owner: new Types.ObjectId(userId),
    });

    return {
      success: true,
      status: 201,
      data: newTask,
    };
  } catch (error) {
    console.error("Create Task Error:", error);
    return {
      success: false,
      status: 500,
      message: "Failed to create task",
    };
  }
};

export const getTasksUseCase = async (userId: string) => {
  try {
    const tasks = await Task.find({ owner: userId });

    return {
      success: true,
      status: 200,
      data: tasks,
    };
  } catch (error) {
    console.error("Get Tasks Error:", error);
    return {
      success: false,
      status: 500,
      message: "Failed to fetch tasks",
    };
  }
};

export const updateTaskUseCase = async (
  userId: string,
  taskId: string,
  data: any
) => {
  try {
    const updated = await Task.findOneAndUpdate(
      { _id: taskId, owner: userId },
      data,
      { new: true }
    );

    if (!updated) {
      return {
        success: false,
        status: 404,
        message: "Task not found",
      };
    }

    return {
      success: true,
      status: 200,
      data: updated,
    };
  } catch (error) {
    console.error("Update Task Error:", error);
    return {
      success: false,
      status: 500,
      message: "Failed to update task",
    };
  }
};

export const deleteTaskUseCase = async (userId: string, taskId: string) => {
  try {
    const deleted = await Task.findOneAndDelete({
      _id: taskId,
      owner: userId,
    });

    if (!deleted) {
      return {
        success: false,
        status: 404,
        message: "Task not found",
      };
    }

    return {
      success: true,
      status: 200,
      message: "Task deleted",
    };
  } catch (error) {
    console.error("Delete Task Error:", error);
    return {
      success: false,
      status: 500,
      message: "Failed to delete task",
    };
  }
};

export const getDashboardStatsUseCase = async (userId: string) => {
  try {
    const tasks = await Task.find({ owner: userId });

    let inProgress = 0;
    let completed = 0;
    let pending = 0;

    for (const t of tasks) {
      if (t.status === "in-progress") inProgress++;
      else if (t.status === "done") completed++;
      else if (t.status === "todo") pending++;
    }

    const statusInfo = {
      totalTasks: tasks.length,
      inProgress,
      completedTasks: completed,
      pendingTasks: pending,
    };

    return {
      success: true,
      status: 200,
      data: statusInfo,
    };
  } catch (error) {
    console.error("Dashboard Stats Error:", error);
    return {
      success: false,
      status: 500,
      message: "Failed to fetch dashboard stats",
    };
  }
};
