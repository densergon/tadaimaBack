import { Router } from "express";
import { teachersController } from "../controllers/teachers.controller";

const router = Router()

router.get('/', teachersController.getTeachers)
router.get('/:id', teachersController.getTeacher)
router.post('/', teachersController.createTeacher)
router.put('/:id', teachersController.updateTeacher)
router.delete('/:id', teachersController.deleteTeacher)

export default router