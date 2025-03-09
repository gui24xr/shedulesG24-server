import express from  'express'
import { notificationsConfigsControllers } from './notificationsConfigs.controller.js'

export const router = express.Router()

router.post('/', notificationsConfigsControllers.create)
router.get('/:id',notificationsConfigsControllers.getOne)
router.get('/',notificationsConfigsControllers.getMany)
router.delete('/', notificationsConfigsControllers.deleteManyById)
router.put('/:id', notificationsConfigsControllers.updateById)

