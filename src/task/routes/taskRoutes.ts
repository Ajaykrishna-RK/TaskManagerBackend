import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  testTask,
  updateTask,
} from "../controllers/TaskController";
// import { auth } from "../middlewares/auth.middleware";

const router = Router();

// router.use(auth);

router.post("/", createTask);
router.get("/", getTasks);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/test", testTask);

export default router;
