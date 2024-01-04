import Router from 'express'
import { adminController } from '../controllers/admin.controller';

const router = Router()

router.get('/:id', adminController.getAdmin);

export default router