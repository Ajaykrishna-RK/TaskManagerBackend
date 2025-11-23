"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = exports.deleteTask = exports.updateTask = exports.getTasks = exports.createTask = exports.testTask = void 0;
const taskUseCase_1 = require("../usecases/taskUseCase");
const testTask = async (req, res) => {
    try {
        const result = await (0, taskUseCase_1.taskTestUseCase)();
        return res.json(result);
    }
    catch (error) {
        console.error("Create Task Controller Error:", error);
        return res.status(500).json({
            success: false,
            message: "Controller Error (Create Task)",
        });
    }
};
exports.testTask = testTask;
const createTask = async (req, res) => {
    try {
        const result = await (0, taskUseCase_1.createTaskUseCase)(req.userId, req.body);
        return res.status(result.status).json(result);
    }
    catch (error) {
        console.error("Create Task Controller Error:", error);
        return res.status(500).json({ success: false });
    }
};
exports.createTask = createTask;
const getTasks = async (req, res) => {
    try {
        const result = await (0, taskUseCase_1.getTasksUseCase)(req.userId);
        return res.status(result.status).json(result);
    }
    catch {
        return res.status(500).json({ success: false });
    }
};
exports.getTasks = getTasks;
const updateTask = async (req, res) => {
    try {
        const result = await (0, taskUseCase_1.updateTaskUseCase)(req.userId, req.params.id, req.body);
        return res.status(result.status).json(result);
    }
    catch {
        return res.status(500).json({ success: false });
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res) => {
    try {
        const result = await (0, taskUseCase_1.deleteTaskUseCase)(req.userId, req.params.id);
        return res.status(result.status).json(result);
    }
    catch {
        return res.status(500).json({ success: false });
    }
};
exports.deleteTask = deleteTask;
const getDashboardStats = async (req, res) => {
    try {
        const userId = req.userId;
        const result = await (0, taskUseCase_1.getDashboardStatsUseCase)(userId);
        return res.status(result.status).json(result);
    }
    catch (error) {
        console.error("Dashboard Stats Controller Error:", error);
        return res.status(500).json({
            success: false,
            status: 500,
            message: "Failed to fetch dashboard stats",
        });
    }
};
exports.getDashboardStats = getDashboardStats;
