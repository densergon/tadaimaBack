import Router from 'express'
import { materialesController } from '../controllers/materiales.controller'

const router = Router()

router.get('/all/:id', materialesController.getMateriales)
router.get('/one/:id', materialesController.getMaterial)
router.post('/', materialesController.createMaterial)
router.delete('/:id', materialesController.deleteMaterial)


export default router