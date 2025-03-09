import express from  'express'
import { offeringsControllers } from './offerings.controller.js'

export const router = express.Router()

router.post('/', offeringsControllers.create)
router.get('/:id',offeringsControllers.getOne)
router.get('/',offeringsControllers.getMany)
router.delete('/', offeringsControllers.deleteManyById)
router.put('/:id', offeringsControllers.updateById)

