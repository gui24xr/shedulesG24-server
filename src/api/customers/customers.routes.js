import express from  'express'
import { customersControllers } from './customers.controller.js'

export const router = express.Router()

router.post('/', customersControllers.create)
router.get('/:id',customersControllers.getOne)
router.get('/',customersControllers.getMany)
router.delete('/',customersControllers.deleteManyById)
router.put('/:id',customersControllers.updateById)
