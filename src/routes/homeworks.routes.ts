import { Router } from "express";
import { homeworksController } from "../controllers/homeworks.controller";

const router = Router();

router.get('/clase/:id', homeworksController.getHomeworks)
router.get('/tarea/:id', homeworksController.getHomework)
router.post('/', homeworksController.createHomework)
router.put('/:id', homeworksController.updateHomework)
router.delete('/:id', homeworksController.deleteHomework)




export default router