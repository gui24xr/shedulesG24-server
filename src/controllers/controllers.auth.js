
export default class AuthController{
    constructor({authService,loggerManager= null}){
        this.authService = authService;
        this.loggerManager = loggerManager;
    }

    postLoginOrRegisterOwner = async(req,res,next)=>{
        try {
               const  {accessToken, refreshToken} = await this.authService.handleLoginOrRegisterOwner({
               authProvider: 'auth0',...req.auth0UserData});
               this.loggerManager && this.loggerManager.debug(`Tokens generados: accessToken: ${accessToken} \n y refreshToken: ${refreshToken}`);
              
               res.cookie(process.env.COOKIE_ACCESS_TOKEN_OWNERS_APP,accessToken,{
                httpOnly: true,
                 secure: true,
                sameSite: "lax",
                 secure:false,
                 signed: true
               })

               res.cookie(process.env.COOKIE_REFRESH_TOKEN_OWNERS_APP,refreshToken,{
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                 secure:false,
                 signed: true
               })

               this.loggerManager && this.loggerManager.debug(`accessToken: ${accessToken} y refreshToken: ${refreshToken}`);
             return res.status(201).json({
                 message:'User autenticado exitosamente...',
                 //ownerProfileData:ownerProfileData
             })
                 
        }catch (error) {
            this.loggerManager && this.loggerManager.error(error.message)
            next(error)
        }
    }

    handleRefreshToken = async(req,res,next)=>{
        try{
            const {ownerId} = req.user.owner.id;
            const newAccessToken = await this.authService.handleRefreshToken(ownerId)
            res.cookie(process.env.COOKIE_ACCESS_TOKEN_OWNERS_APP,newAccessToken,{
                //httpOnly: true,
                 //secure: true,
                 //sameSite: "none",
                 secure:false,
                 signed: true
            })
            return res.status(200).json({
                message: 'Token actualizado exitosamente...'
            })
        }catch(error){
            this.loggerManager && this.loggerManager.error(error.message)
            next(error)
        }
    }
    

    logoutOwner = async(req,res,next)=>{
        try{
            res.clearCookie(process.env.COOKIE_ACCESS_TOKEN_OWNERS_APP)
            res.clearCookie(process.env.COOKIE_REFRESH_TOKEN_OWNERS_APP)
            return res.status(200).json({
                message: 'Sesion cerrada exitosamente...'
            })


        }catch(error){
            this.loggerManager && this.loggerManager.error(error.message)
            next(error)
        }
    } 
}
      
