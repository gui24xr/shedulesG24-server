
import express from 'express'
import passport from '../config/passport.js'
import { ownersController } from '../controllers/index.js'

const ownersRouter = express.Router()

ownersRouter.get('/profile',passport.authenticate("jwt_admin_and_users",{session:false}),ownersController.getOwnerProfileById)
ownersRouter.put('/profile',passport.authenticate("jwt_admin_and_users",{session:false}),ownersController.updateOwnerProfile)




export default ownersRouter;
