import express from  'express'
import { companyBranchsControllers } from './companyBranchs.controller.js'

export const router = express.Router()

router.post('/', companyBranchsControllers.create)
router.get('/:id',companyBranchsControllers.getOne)
router.get('/',companyBranchsControllers.getMany)
router.delete('/', companyBranchsControllers.deleteManyById)
router.put('/:id', companyBranchsControllers.updateById)

