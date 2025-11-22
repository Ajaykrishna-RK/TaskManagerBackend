import { Router } from "express";
import {
  createTask,
  deleteTask,
  getDashboardStats,
  getTasks,
  testTask,
  updateTask,
} from "../controllers/TaskController";
import { auth } from "../../middleware/auth.middleware";

const router = Router();

router.use(auth);

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/test", testTask);
router.get("/dashboard", getDashboardStats);

export default router;
