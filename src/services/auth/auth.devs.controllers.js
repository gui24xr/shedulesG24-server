import { logger } from '../../config/logger.config.js';
import jwt from "jsonwebtoken";
import { authDevManager } from './auth.devs.manager.js';
import { authSchema } from './auth.schema.js';

export const authDevsControllers = {


    registerAsDev: async (req,res,next) => {
        try{
            authSchema.createDevSchema.parse(req.body)
            const createdUser = await authDevManager.registerAsDev(req.body)
            res.status(201).json({...createdUser})
        }catch(error){
            res.status(500).json({error:error.message})
        }
    },


    loginAsDev: async (req,res,next) => {
        try{
            authSchema.loginDevSchema.parse(req.body)
            const authUser = await authDevManager.handleDevUserLogin(req.body)
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
              logger.info(`Generated token: ${token}`);

            return res.status(201).json({
                message:'User autenticado y autorizado con exit con permisos DEV...',
                user: authUser
            })

        }catch(error){
            res.status(500).json({error:error.message})
        }
    },


    


    logout: (req,res,next) =>{
        res.clearCookie(process.env.SERVER_COOKIES_JWT, { path: '/' }); // Elimina la cookie en el navegador
        res.status(200).json({ message: 'Cookies eliminadas' });
    },

    


    
}


