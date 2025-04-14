import express from 'express'
import { authService } from '../services/index.services.js'
import { verifyAuth0TokenAndGetUserData } from '../middlewares/index.middlewares.js'
import AuthController from '../controllers/auth.controllers.js'


const authRouter = express.Router();

//Mas adelante este controller lo tengo que crear y poner en index controllers.
const authController = new AuthController(authService);

authRouter.post('/owners/login-or-register',verifyAuth0TokenAndGetUserData,authController.postLoginOrRegisterOwner);


export default authRouter;