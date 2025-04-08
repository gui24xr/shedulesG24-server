import { logger } from '../config/logger.config.js'



export default class AuthController{
    constructor(authService){
        this.authService = authService;
    }

    postLoginOrRegisterOwner = async(req,res,next)=>{
        try {
         
               const { token, user: authUser } = await this.authService.handleLoginOrRegisterOwner(req.auth0UserData);
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
    }
}