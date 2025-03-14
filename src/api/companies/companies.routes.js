import express from  'express'
import { companiesControllers } from './companies.controller.js'
import { checkRole } from '../../middlewares/checkRole.js'
import passport from '../../config/passport.js'

export const companiesDevRouter = express.Router()

companiesDevRouter.use(passport.authenticate("jwt",{session:false}))
companiesDevRouter.use(checkRole(['dev']))

companiesDevRouter.post('/', companiesControllers.create)
companiesDevRouter.get('/:id',companiesControllers.getOne)
companiesDevRouter.get('/',companiesControllers.getMany)
companiesDevRouter.delete('/', companiesControllers.deleteManyById)
companiesDevRouter.put('/:id', companiesControllers.updateById)
