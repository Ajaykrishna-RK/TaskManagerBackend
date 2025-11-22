import { Schema, model, Document, Types } from "mongoose";

export interface ITask extends Document {
  task: string;
  description?: string;
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  status: "todo" | "in-progress" | "done";
  aiSuggestedPriority?: string;
  owner: Types.ObjectId;
}

const TaskSchema = new Schema<ITask>(
  {
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
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default model<ITask>("Task", TaskSchema);
