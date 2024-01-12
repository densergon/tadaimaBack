import Router from 'express'
import { deliveredController } from '../controllers/delivered.controller'

const router = Router()

router.get('/all/:id', deliveredController.getDeliveredHomeworks)
router.get('/one/:id', deliveredController.getDeliveredHomework)
router.post('/', deliveredController.entregarTarea)
router.put('/', deliveredController.calificar)

export default router