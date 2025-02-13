import express from 'express'
import { shedulesControllers } from './controllers.js'

export const router = express.Router()

router.get('/',shedulesControllers.getShedules)
router.post('/',shedulesControllers.createShedule)
router.post('/slots/single', shedulesControllers.createSlot)
router.post('/slots/many', shedulesControllers.createSlotsMany)