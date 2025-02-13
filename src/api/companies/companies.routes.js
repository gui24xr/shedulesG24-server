import express from  'express'
import passport from '../../config/passport.js'
import { companiesController } from './companies.controllers.js'
export const router = express.Router()


const defaultFunction = (req,res,next) => {res.send("Default function")}

router.get('/',defaultFunction)
router.post('/', passport.authenticate("jwt",{session:false}), companiesController.createCompany)
router.delete('/:id',defaultFunction)