import express from  'express'
import { CompanyBranchsControllers } from './controllers.js'

export const router = express.Router()

const companyBranchsControllers = new CompanyBranchsControllers()


router.post('/', companyBranchsControllers.create)
router.get('/:bid',companyBranchsControllers.getOne)
router.get('/',companyBranchsControllers.getMany)
router.delete('/',companyBranchsControllers.delete)
router.put('/:bid',companyBranchsControllers.update)

