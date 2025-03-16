import { logger } from '../../config/logger.config.js';
import jwt from "jsonwebtoken";
import { authUsersManager } from './auth.users.manager.js';

export const authUsersControllers = {



    loginAsAdmin: async (req,res,next)=>{
        try{
            const authUser = await authUsersManager.handleUserAuth0Admin({
                email:req.auth0UserData.email,
                userName:req.auth0UserData.userName,
                firstName: req.auth0UserData.firstName,
                lastName: req.auth0UserData.lastName,
                profilePicture: req.auth0UserData.profilePicture
            })

            const token = jwt.sign({
                userId:authUser.id,
                role: authUser.role,
                enabled: authUser.enabled
            },
            process.env.SERVER_JWT_SIGN,
            {expiresIn: "1h"})
            
            logger.info(`Generated token para user-admin: ${token}`);
            
            res.cookie(process.env.SERVER_COOKIES_JWT_NAME,token,{
               //httpOnly: true,
                //secure: true,
                //sameSite: "none",
                secure:false,
                signed: true
              })
            
            return res.status(201).json({
                message:'User autenticado y autorizado con exito...',
                user: {...authUser}
            })
        }catch(error){
            console.error(error)
            res.status(500).json({error:error})
        }
    },


  
    


    
}


