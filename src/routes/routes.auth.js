import express from 'express'
import { verifyAuth0TokenAndGetUserData } from '../middlewares/index.middlewares.js'
import { authController } from '../controllers/index.js'

const authRouter = express.Router();

authRouter.post('/owners/login-or-register',verifyAuth0TokenAndGetUserData,authController.postLoginOrRegisterOwner);


export default authRouter;