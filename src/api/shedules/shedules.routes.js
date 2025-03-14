import express from  'express'
import  { shedulesControllers } from './shedules.controller.js'
import { checkRole } from '../../middlewares/checkRole.js'
import passport from '../../config/passport.js'

export const shedulesDevRouter = express.Router()

shedulesDevRouter.use(passport.authenticate("jwt",{session:false}))
shedulesDevRouter.use(checkRole(['dev']))

shedulesDevRouter.post('/', shedulesControllers.create)
shedulesDevRouter.get('/:id',shedulesControllers.getOne)
shedulesDevRouter.get('/',shedulesControllers.getMany)
shedulesDevRouter.delete('/', shedulesControllers.deleteManyById)
shedulesDevRouter.put('/:id', shedulesControllers.updateById)

