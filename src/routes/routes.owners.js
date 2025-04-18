
import express from 'express'
import passport from '../config/passport.js'
import { ownersController } from '../controllers/index.js'

const ownersRouter = express.Router()

ownersRouter.get('/',passport.authenticate("jwt_all_clientesApp",{session:false}),ownersController.getOwnerById)
ownersRouter.put('/',passport.authenticate("jwt_all_clientesApp",{session:false}),ownersController.updateOwnerProfile)

ownersRouter.post('/establishments',passport.authenticate("jwt_all_clientesApp",{session:false}),ownersController.createBasicEstablishment)
ownersRouter.get('/establishments',passport.authenticate("jwt_all_clientesApp",{session:false}),ownersController.getOwnerEstablishments)

export default ownersRouter;
