import { Router } from "express";
import { homeworksController } from "../controllers/homeworks.controller";

const router = Router();

router.get('/', homeworksController.getHomeworks)
router.get('/:id', homeworksController.getHomework)
router.post('/', homeworksController.createHomework)
router.put('/:id', homeworksController.updateHomework)
router.delete('/:id', homeworksController.deleteHomework)




export default router