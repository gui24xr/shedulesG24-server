
import express from 'express'
import passport from '../config/passport.js'
import { ownersController } from '../controllers/index.js'

const ownersRouter = express.Router()

ownersRouter.get('/',passport.authenticate("jwt_owners_app",{session:false}),ownersController.getOwnerById)
ownersRouter.put('/',passport.authenticate("jwt_owners_app",{session:false}),ownersController.updateOwnerProfile)

ownersRouter.post('/establishments',passport.authenticate("jwt_owners_app",{session:false}),ownersController.createBasicEstablishment)

export default ownersRouter;
