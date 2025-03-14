import express from  'express'
import { providedServicesControllers } from './providedServices.controller.js'
import { checkRole } from '../../middlewares/checkRole.js'
import passport from '../../config/passport.js'

export const providedServicesDevRouter = express.Router()

providedServicesDevRouter.use(passport.authenticate("jwt",{session:false}))
providedServicesDevRouter.use(checkRole(['dev']))

providedServicesDevRouter.post('/', providedServicesControllers.create)
providedServicesDevRouter.get('/:id',providedServicesControllers.getOne)
providedServicesDevRouter.get('/',providedServicesControllers.getMany)
providedServicesDevRouter.delete('/', providedServicesControllers.deleteManyById)
providedServicesDevRouter.put('/:id', providedServicesControllers.updateById)

