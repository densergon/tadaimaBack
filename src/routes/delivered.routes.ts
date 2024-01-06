import Router from 'express'
import { deliveredController } from '../controllers/delivered.controller'

const router = Router()

router.get('/:id', deliveredController.getDeliveredHomeworks)

export default router