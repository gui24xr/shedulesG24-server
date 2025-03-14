import express from 'express'
import { verifyAuth0Token } from './utils/getUserDataFromAuth0Token.js'
import { authControllers } from './auth.controllers.js'
import passport from '../../config/passport.js'

export const authRouter = express.Router()

authRouter.post('/login',verifyAuth0Token,authControllers.login)
authRouter.post('/logout',passport.authenticate("jwt",{session:false}),authControllers.logout)


authRouter.post('/register-dev', authControllers.registerAsDev)
authRouter.post('/login-dev',  authControllers.loginAsDev)