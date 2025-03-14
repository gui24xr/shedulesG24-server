import express from  'express'
import { sheduleSlotsControllers } from './sheduleSlots.controller.js'
import { checkRole } from '../../middlewares/checkRole.js'
import passport from '../../config/passport.js'

export const sheduleSlotsDevRouter = express.Router()

sheduleSlotsDevRouter.use(passport.authenticate("jwt",{session:false}))
sheduleSlotsDevRouter.use(checkRole(['dev']))

sheduleSlotsDevRouter.post('/', sheduleSlotsControllers.create)
sheduleSlotsDevRouter.get('/:id',sheduleSlotsControllers.getOne)
sheduleSlotsDevRouter.get('/',sheduleSlotsControllers.getMany)
sheduleSlotsDevRouter.delete('/', sheduleSlotsControllers.deleteManyById)
sheduleSlotsDevRouter.put('/:id', sheduleSlotsControllers.updateById)

