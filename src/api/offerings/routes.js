import express from  'express'
export const router = express.Router()
import { OfferingControllers } from './controllers.js'

const offeringControllers = new OfferingControllers()
const defaultFunction = (req,res,next) => {res.send("Default function")}

router.post('/', defaultFunction)
router.get('/:oid',defaultFunction)
router.get('/',defaultFunction)
router.delete('/', defaultFunction)
router.put('/:oid', defaultFunction)