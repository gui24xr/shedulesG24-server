import express from 'express'
import { verifyAuth0Token } from '../../middlewares/verifyAuth0Token.js'
import { authControllers } from './controllers.js'
import passport from '../../config/passport.js'

export const router = express.Router()

router.post('/login',verifyAuth0Token,authControllers.login)
router.post('/logout',passport.authenticate("jwt",{session:false}),authControllers.logout)

