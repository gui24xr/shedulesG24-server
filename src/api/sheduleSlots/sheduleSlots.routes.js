import express from  'express'
import { sheduleSlotsControllers } from './sheduleSlots.controller.js'

export const router = express.Router()

router.post('/', sheduleSlotsControllers.create)
router.get('/:id',sheduleSlotsControllers.getOne)
router.get('/',sheduleSlotsControllers.getMany)
router.delete('/', sheduleSlotsControllers.deleteManyById)
router.put('/:id', sheduleSlotsControllers.updateById)

