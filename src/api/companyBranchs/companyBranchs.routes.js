import express from  'express'
import { companyBranchsControllers } from './companyBranchs.controller.js'
import { checkRole } from '../../middlewares/checkRole.js'
import passport from '../../config/passport.js'


export const companyBranchsDevRouter = express.Router()

companyBranchsDevRouter.use(passport.authenticate("jwt",{session:false}))
companyBranchsDevRouter.use(checkRole(['dev']))

companyBranchsDevRouter.post('/', companyBranchsControllers.create)
companyBranchsDevRouter.get('/:id',companyBranchsControllers.getOne)
companyBranchsDevRouter.get('/',companyBranchsControllers.getMany)
companyBranchsDevRouter.delete('/', companyBranchsControllers.deleteManyById)
companyBranchsDevRouter.put('/:id', companyBranchsControllers.updateById)

