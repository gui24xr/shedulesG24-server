import express from  'express'
import { CompanyBranchsControllers } from './controllers.js'

export const router = express.Router()

const companyBranchsControllers = new CompanyBranchsControllers()
const defaultFunction = (req,res,next) => {res.send("Default function")}

router.get('/:bid',companyBranchsControllers.getOne)
router.get('/',companyBranchsControllers.getMany)
router.post('/', companyBranchsControllers.create)
router.delete('/',companyBranchsControllers.delete)
router.put('/:bid',companyBranchsControllers.update)

