import express from  'express'
import  { shedulesControllers } from './shedules.controller.js'

export const router = express.Router()

router.post('/', shedulesControllers.create)
router.get('/:id',shedulesControllers.getOne)
router.get('/',shedulesControllers.getMany)
router.delete('/', shedulesControllers.deleteManyById)
router.put('/:id', shedulesControllers.updateById)

