"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const TaskSchema = new mongoose_1.Schema({
    task: { type: String, required: true },
    description: { type: String },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium",
    },
    dueDate: Date,
    status: {
        type: String,
        enum: ["todo", "in-progress", "done"],
        default: "todo",
    },
    aiSuggestedPriority: String,
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)("Task", TaskSchema);
