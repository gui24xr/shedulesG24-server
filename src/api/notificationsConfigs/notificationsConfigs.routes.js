import express from  'express'
import { notificationsConfigsControllers } from './notificationsConfigs.controller.js'
import { checkRole } from '../../middlewares/checkRole.js'
import passport from '../../config/passport.js'


export const notificationsConfigsDevRouter = express.Router()

notificationsConfigsDevRouter.use(passport.authenticate("jwt",{session:false}))
notificationsConfigsDevRouter.use(checkRole(['dev']))

notificationsConfigsDevRouter.post('/', notificationsConfigsControllers.create)
notificationsConfigsDevRouter.get('/:id',notificationsConfigsControllers.getOne)
notificationsConfigsDevRouter.get('/',notificationsConfigsControllers.getMany)
notificationsConfigsDevRouter.delete('/', notificationsConfigsControllers.deleteManyById)
notificationsConfigsDevRouter.put('/:id', notificationsConfigsControllers.updateById)

