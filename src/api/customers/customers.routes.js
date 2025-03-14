import express from  'express'
import { customersControllers } from './customers.controller.js'
import { checkRole } from '../../middlewares/checkRole.js'
import passport from '../../config/passport.js'

export const customersDevRouter = express.Router()
customersDevRouter.use(passport.authenticate("jwt",{session:false}))
customersDevRouter.use(checkRole(['dev']))

customersDevRouter.post('/', customersControllers.create)
customersDevRouter.get('/:id',customersControllers.getOne)
customersDevRouter.get('/', customersControllers.getMany)
customersDevRouter.delete('/',customersControllers.deleteManyById)
customersDevRouter.put('/:id',customersControllers.updateById)
