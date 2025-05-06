import express from 'express'
import { verifyAuth0TokenAndGetUserData } from '../middlewares/index.middlewares.js'
import { authController } from '../controllers/index.js'
import passport from '../config/passport.js'
const authRouter = express.Router();

authRouter.post('/owners/login-or-register',verifyAuth0TokenAndGetUserData,authController.postLoginOrRegisterOwner);
authRouter.post('/owners/refresh-token',passport.authenticate("extact_refresh_token",{session:false}),authController.handleRefreshToken);
authRouter.post('/owners/logout',authController.logoutOwner);


export default authRouter;