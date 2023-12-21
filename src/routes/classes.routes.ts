import { Router } from "express";
import { classesController } from "../controllers/classes.controller";

const router = Router();

router.get('/', classesController.getClasses)
router.get('/:id', classesController.getClass)
router.post('/', classesController.createClass)
router.put('/:id', classesController.updateClass)
router.delete('/:id', classesController.deleteClass)

export default router