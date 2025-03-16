import express from 'express'
import { authDevsControllers } from './auth.devs.controllers.js'
import passport from '../../config/passport.js'

export const authDevsRouter = express.Router()


authDevsRouter.post('/register-dev', authDevsControllers.registerAsDev)
authDevsRouter.post('/login-dev',  authDevsControllers.loginAsDev)


authDevsRouter.post('/logout',passport.authenticate("jwt",{session:false}),authDevsControllers.logout)

