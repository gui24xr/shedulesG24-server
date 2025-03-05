import express from 'express'
import { NotificationsConfigsControllers } from './controllers.js'

export const router = express.Router()
const notificationsConfigControllers = new NotificationsConfigsControllers()


router.get('/:ncid',notificationsConfigControllers.getOne)
router.get('/',notificationsConfigControllers.getMany)
router.post('/',notificationsConfigControllers.create)
router.delete('/',notificationsConfigControllers.delete)
router.put('/:ncid/whatsapp',notificationsConfigControllers.updateWhatsAppConfig)
router.put('/:ncid/sms',notificationsConfigControllers.updateSMSConfig)
router.put('/:ncid/config',notificationsConfigControllers.updateEmailConfig)