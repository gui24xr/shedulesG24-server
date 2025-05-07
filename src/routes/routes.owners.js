
import express from 'express'
import passport from '../config/passport.js'
import { ownersController } from '../controllers/index.js'

const ownersRouter = express.Router()

ownersRouter.get('/profile',passport.authenticate("extractOwnerAccessToken",{session:false}),ownersController.getOwnerProfileById)
ownersRouter.put('/profile',passport.authenticate("extractOwnerAccessToken",{session:false}),ownersController.updateOwnerProfile)




export default ownersRouter;
