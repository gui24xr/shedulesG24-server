import express from  'express'
import { employeesControllers } from '../controllers/employees.controller.js'
import { checkRole } from '../middlewares/checkRole.js'
import passport from '../config/passport.js'

export const employeesDevRouter = express.Router()


employeesDevRouter.use(passport.authenticate("jwt",{session:false}))
employeesDevRouter.use(checkRole(['dev']))

employeesDevRouter.post('/', employeesControllers.create)
employeesDevRouter.get('/:id',employeesControllers.getOne)
employeesDevRouter.get('/',passport.authenticate("jwt",{session:false}),employeesControllers.getMany)
employeesDevRouter.delete('/', employeesControllers.deleteManyById)
employeesDevRouter.put('/:id', employeesControllers.updateById)

