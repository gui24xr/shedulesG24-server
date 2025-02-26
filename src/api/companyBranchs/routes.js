import express from  'express'
import { CompanyBranchsRepository } from './repository.js'

export const router = express.Router()

const companyBranchsRepository = new CompanyBranchsRepository()
const defaultFunction = (req,res,next) => {res.send("Default function")}

router.get('/:bid?',defaultFunction)
router.post('/', defaultFunction)
router.delete('/',defaultFunction)
router.put('/:bid/name')
router.put('/:bid/location')
router.put('/:bid/confignotification')