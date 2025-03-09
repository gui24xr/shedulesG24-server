import express from  'express'
import { companiesControllers } from './companies.controller.js'

export const router = express.Router()

router.post('/', companiesControllers.create)
router.get('/:id',companiesControllers.getOne)
router.get('/',companiesControllers.getMany)
router.delete('/', companiesControllers.deleteManyById)
router.put('/:id', companiesControllers.updateById)
