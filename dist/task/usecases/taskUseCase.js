"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStatsUseCase = exports.deleteTaskUseCase = exports.updateTaskUseCase = exports.getTasksUseCase = exports.createTaskUseCase = exports.taskTestUseCase = void 0;
const mongoose_1 = require("mongoose");
const Task_1 = __importDefault(require("../../models/taskModel/Task"));
const taskTestUseCase = async () => {
    try {
        return {
            success: true,
            status: 201,
            data: "Test Api Working",
        };
    }
    catch (err) {
        console.log(err);
    }
};
exports.taskTestUseCase = taskTestUseCase;
const createTaskUseCase = async (userId, data) => {
    try {
        const newTask = await Task_1.default.create({
            ...data,
            owner: new mongoose_1.Types.ObjectId(userId),
        });
        return {
            success: true,
            status: 201,
            data: newTask,
        };
    }
    catch (error) {
        console.error("Create Task Error:", error);
        return {
            success: false,
            status: 500,
            message: "Failed to create task",
        };
    }
};
exports.createTaskUseCase = createTaskUseCase;
const getTasksUseCase = async (userId) => {
    try {
        const tasks = await Task_1.default.find({ owner: userId });
        return {
            success: true,
            status: 200,
            data: tasks,
        };
    }
    catch (error) {
        console.error("Get Tasks Error:", error);
        return {
            success: false,
            status: 500,
            message: "Failed to fetch tasks",
        };
    }
};
exports.getTasksUseCase = getTasksUseCase;
const updateTaskUseCase = async (userId, taskId, data) => {
    try {
        const updated = await Task_1.default.findOneAndUpdate({ _id: taskId, owner: userId }, data, { new: true });
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
    }
    catch (error) {
        console.error("Update Task Error:", error);
        return {
            success: false,
            status: 500,
            message: "Failed to update task",
        };
    }
};
exports.updateTaskUseCase = updateTaskUseCase;
const deleteTaskUseCase = async (userId, taskId) => {
    try {
        const deleted = await Task_1.default.findOneAndDelete({
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
    }
    catch (error) {
        console.error("Delete Task Error:", error);
        return {
            success: false,
            status: 500,
            message: "Failed to delete task",
        };
    }
};
exports.deleteTaskUseCase = deleteTaskUseCase;
const getDashboardStatsUseCase = async (userId) => {
    try {
        const tasks = await Task_1.default.find({ owner: userId });
        let inProgress = 0;
        let completed = 0;
        let pending = 0;
        for (const t of tasks) {
            if (t.status === "in-progress")
                inProgress++;
            else if (t.status === "done")
                completed++;
            else if (t.status === "todo")
                pending++;
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
    }
    catch (error) {
        console.error("Dashboard Stats Error:", error);
        return {
            success: false,
            status: 500,
            message: "Failed to fetch dashboard stats",
        };
    }
};
exports.getDashboardStatsUseCase = getDashboardStatsUseCase;
