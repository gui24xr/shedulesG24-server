import express from 'express'
import User from '../models/models.user.js'
import { logger } from '../config/logger.config.js'
import jwt from 'jsonwebtoken'
import { verifyAuth0Token, getUserDataFromAuth0Token } from '../middlewares/getUserDataFromAuth0Token.js'


export const authRouter = express.Router();

authRouter.post('/owners/login-or-register',verifyAuth0Token,getUserDataFromAuth0Token,
    async(req,res,next)=>{
        try {
            const auth0UserEmail = req.auth0UserData.email;
            let authUser = await User.findOneAndUpdate(
                { email: auth0UserEmail,role:'owner' },
                { authProvider: 'auth0', lastLogin: new Date() },
                { new: true })

            if (!authUser) {
                authUser = await User.create({
                    authProvider: 'auth0',
                    email:auth0UserEmail,
                    role:'owner',
                    enabled:true,
                    lastLogin:new Date()})
                }

                const token = jwt.sign({
                    userId:authUser.id,
                    role: authUser.role,
                    enabled: authUser.enabled
                },
                process.env.SERVER_JWT_SIGN,{expiresIn: "1h"})

            res.cookie(process.env.SERVER_COOKIES_JWT_NAME,token,{
                //httpOnly: true,
                 //secure: true,
                 //sameSite: "none",
                 secure:false,
                 signed: true
               })
               logger.info(`Generated token en auth.routes.js: ${token}`);
 
             return res.status(201).json({
                 message:'User autenticado exitosamente...',
                 user: authUser
             })
 
       
        }catch (error) {
            logger.error(error.message)
            next(error)
        }
    })


