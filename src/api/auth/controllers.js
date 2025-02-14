
import { UsersService } from '../users/users.service.js'
import jwt from "jsonwebtoken";
import axios from 'axios'


const usersService = new UsersService()

export const authControllers = {


    login: async (req,res,next)=>{
        try{
            const userFromAuth0Token = await getUserDataFromAuth0Token(req.headers.authorization)

            const authUser = await usersService.handleUserAuth({
                email:userFromAuth0Token.email,
                userName:userFromAuth0Token.userName,
                firstName: userFromAuth0Token.firstName,
                lastName: userFromAuth0Token.lastName,
                profilePicture: userFromAuth0Token.profilePicture
            })

            const token = jwt.sign({userId:authUser.id},process.env.SERVER_JWT_SIGN,{expiresIn: "1h"})
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


    
}



const getUserDataFromAuth0Token = async (requestHeaderAuthorization) => {
    //console.log('Pasando x ge token', req.headers.authorization)
    try{
        const response =  await axios.get('https://dev-8puz7l6ml0moiqni.us.auth0.com/userinfo', {
            headers: {
                Authorization: requestHeaderAuthorization
            }
        });
        return {
          email:response.data.email,
          userName: response.data.nickname,
          firstName: response.data.given_name,
          lastName: response.data.family_name,
          profilePicture: response.data.picture
        }
    }catch(error){
        console.error(error)
        throw new Error('No se pudieron extraer los datos desde el servicio de autorizacion externo...')
    }
  }
