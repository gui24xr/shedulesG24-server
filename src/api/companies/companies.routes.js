import express from  'express'
import passport from '../../config/passport.js'
import { companiesController } from './companies.controllers.js'
export const router = express.Router()



const defaultFunction = (req,res,next) => {res.send("Default function")}

router.get('/',passport.authenticate("jwt",{session:false}),companiesController.getCompanies)
router.get('/:cid',passport.authenticate("jwt",{session:false}),companiesController.getCompanyById)
router.post('/', passport.authenticate("jwt",{session:false}), companiesController.createCompany)
router.delete('/:id',defaultFunction)


router.post('/:cid/offerings', companiesController.createOfferingToCompany)

//---------------dev endpoints