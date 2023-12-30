import Router from 'express'
import { courseController } from '../controllers/course.controller'

const router = Router()

router.get('/:id', courseController.getMyCourses)

export default router