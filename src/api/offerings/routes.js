import express from  'express'
export const router = express.Router()
import { OfferingControllers } from './controllers.js'

const offeringControllers = new OfferingControllers()
const defaultFunction = (req,res,next) => {res.send("Default function")}

router.get('/',defaultFunction)
router.post('/', offeringControllers.createOffering)
router.delete('/:id',)