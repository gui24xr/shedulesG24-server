import express from  'express'
import { bookingsControllers } from './bookings.controller.js'

export const router = express.Router()

router.post('/', bookingsControllers.create)
router.get('/:id',bookingsControllers.getOne)
router.get('/',bookingsControllers.getMany)
router.delete('/', bookingsControllers.deleteManyById)
router.put('/:id', bookingsControllers.updateById)

