import express from 'express'
import { verifyAuth0TokenAndGetUserData } from '../middlewares/index.middlewares.js'
import { authController } from '../controllers/index.js'
import passport from '../config/passport.js'
const authRouter = express.Router();

authRouter.post('/owners/login-or-register',verifyAuth0TokenAndGetUserData,authController.ownersHandleLoginOrRegister);
authRouter.get('/owners/check-session',passport.authenticate("extractOwnerRefreshToken",{session:false}),authController.ownersCheckSession);
authRouter.post('/owners/refresh-token',passport.authenticate("extractOwnerRefreshToken",{session:false}),authController.ownersHandleRefreshToken);
authRouter.post('/owners/logout',/*passport.authenticate("extractOwnerRefreshToken",{session:false}),*/authController.ownersHandleLogout);

authRouter.post('/tenants/logout',passport.authenticate("extractTenantRefreshToken",{session:false}),authController.tenantsHandleLogout);

export default authRouter;