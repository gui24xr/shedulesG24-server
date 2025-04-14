import { logger } from '../config/logger.config.js'



export default class AuthController{
    constructor(authService){
        this.authService = authService;
    }

    postLoginOrRegisterOwner = async(req,res,next)=>{
        try {
               const { token, ownerProfileData } = await this.authService.handleLoginOrRegisterOwner(req.auth0UserData);
               console.log('ownerProfileData:', ownerProfileData, 'token:',token)
              
               res.cookie(process.env.COOKIE_NAME_OWNERS_APP,token,{
                //httpOnly: true,
                 //secure: true,
                 //sameSite: "none",
                 secure:false,
                 signed: true
               })
               logger.info(`Generated token en auth.routes.js: ${token}`);
             return res.status(201).json({
                 message:'User autenticado exitosamente...',
                 ownerProfileData:ownerProfileData
             })
                 
             
 
       
        }catch (error) {
            logger.error(error.message)
            next(error)
        }
    }
}