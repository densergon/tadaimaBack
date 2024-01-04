import Router from 'express'
import { chatController } from '../controllers/chat.controller'

const router = Router()

router.post('/', chatController.newMessage)

export default router