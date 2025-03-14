import { getUserDataFromAuth0Token } from './utils/getUserDataFromAuth0Token.js';
import jwt from "jsonwebtoken";
import { UsersManager } from '../users/users.manager.js';
import { authSchema } from './schema.js';


const usersManager = new UsersManager()

export const authControllers = {

    login: async (req,res,next)=>{
        try{
            const userFromAuth0Token = await getUserDataFromAuth0Token(req.headers.authorization)

            const authUser = await usersManager.handleUserAuth({
                email:userFromAuth0Token.email,
                userName:userFromAuth0Token.userName,
                firstName: userFromAuth0Token.firstName,
                lastName: userFromAuth0Token.lastName,
                profilePicture: userFromAuth0Token.profilePicture
            })

            const token = jwt.sign({
                userId:authUser.id,
                role: authUser.role,
                enabled: authUser.enabled
            },
            process.env.SERVER_JWT_SIGN,
            {expiresIn: "1h"})
            console.log('Generated token: ', token)

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

    logout: (req,res,next) =>{
        res.clearCookie(process.env.SERVER_COOKIES_JWT, { path: '/' }); // Elimina la cookie en el navegador
        res.status(200).json({ message: 'Cookies eliminadas' });
    },

    registerAsDev: async (req,res,next) => {
        try{
            authSchema.createDevSchema.parse(req.body)
            const createdUser = await usersManager.handleDevUserRegister(req.body)
            res.status(201).json({...createdUser})
        }catch(error){
            res.status(500).json({error:error.message})
        }
    },


    loginAsDev: async (req,res,next) => {
        try{
            authSchema.loginDevSchema.parse(req.body)
            const authUser = await usersManager.handleDevUserLogin(req.body)
            console.log('HOlaaaaaaaaa')
            const token = jwt.sign({
                userId:authUser.id,
                role: authUser.role,
                enabled: authUser.enabled
            },
            process.env.SERVER_JWT_SIGN,
            {expiresIn: "1h"})
          
            res.cookie(process.env.SERVER_COOKIES_JWT_NAME,token,{
               //httpOnly: true,
                //secure: true,
                //sameSite: "none",
                secure:false,
                signed: true
              })
            console.log('authUser: ', authUser)
            return res.status(201).json({
                message:'User autenticado y autorizado con exit con permisos DEV...',
                user: authUser
            })

        }catch(error){
            res.status(500).json({error:error.message})
        }
    }



    
}


