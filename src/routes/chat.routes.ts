import Router from 'express'
import { chatController } from '../controllers/chat.controller'

const router = Router()

router.get('/conversacion/:id', chatController.getMessages)
router.get('/conversaciones/:id', chatController.getConversaciones)
router.post('/data', chatController.getNombre)

export default router