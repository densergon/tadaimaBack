import { Router } from "express";
import { studentsController } from "../controllers/students.controller";

const router = Router();

router.get('/', studentsController.getStudents)

export default router