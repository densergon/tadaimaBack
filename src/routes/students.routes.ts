import { Router } from "express";
import { studentsController } from "../controllers/students.controller";

const router = Router();

router.get('/', studentsController.getStudents)
router.get('/curso/:id', studentsController.getStudentsCourse)
router.get('/:id', studentsController.getStudent)
router.post('/', studentsController.createStudent)
router.post('/curso/:id', studentsController.insertStudent)
router.put('/:id', studentsController.updateStudent)
router.patch('/:id', studentsController.boletaStudent)

export default router