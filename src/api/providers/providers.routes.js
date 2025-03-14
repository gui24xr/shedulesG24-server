import express from  'express'
import { providersControllers } from './providers.controller.js'
import { checkRole } from '../../middlewares/checkRole.js'
import passport from '../../config/passport.js'

export const providersDevRouter = express.Router()


providersDevRouter.use(passport.authenticate("jwt",{session:false}))
providersDevRouter.use(checkRole(['dev']))

providersDevRouter.post('/', providersControllers.create)
providersDevRouter.get('/:id',providersControllers.getOne)
providersDevRouter.get('/',passport.authenticate("jwt",{session:false}),providersControllers.getMany)
providersDevRouter.delete('/', providersControllers.deleteManyById)
providersDevRouter.put('/:id', providersControllers.updateById)

