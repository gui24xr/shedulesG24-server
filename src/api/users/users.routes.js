import express from  'express'
import { usersControllers } from './users.controllers.js'
import { checkRole } from '../../middlewares/checkRole.js'
import passport from '../../config/passport.js'

export const usersDevRouter = express.Router()

usersDevRouter.use(passport.authenticate("jwt",{session:false}))
usersDevRouter.use(checkRole(['dev']))

usersDevRouter.post('/', usersControllers.create)
usersDevRouter.get('/:id',usersControllers.getOne)
usersDevRouter.get('/',usersControllers.getMany)
usersDevRouter.delete('/', usersControllers.deleteManyById)
usersDevRouter.put('/:id', usersControllers.updateById)

