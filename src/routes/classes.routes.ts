import { Router } from "express";
import { classesController } from "../controllers/classes.controller";

const router = Router();

router.get('/all/:id', classesController.getClasses)
router.get('/one/:id', classesController.getClass)
router.post('/', classesController.createClass)
router.put('/:id', classesController.updateClass)
router.delete('/:id', classesController.deleteClass)

export default router