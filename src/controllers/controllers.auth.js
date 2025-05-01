
export default class AuthController{
    constructor({authService,loggerManager= null}){
        this.authService = authService;
        this.loggerManager = loggerManager;
    }

    postLoginOrRegisterOwner = async(req,res,next)=>{
        try {
               const { token, ownerProfileData } = await this.authService.handleLoginOrRegisterOwner({
                authProvider: 'auth0',...req.auth0UserData});
               console.log('ownerProfileData:', ownerProfileData, 'token:',token)
              
               res.cookie(process.env.COOKIE_NAME_OWNERS_APP,token,{
                //httpOnly: true,
                 //secure: true,
                 //sameSite: "none",
                 secure:false,
                 signed: true
               })
               this.loggerManager && this.loggerManager.debug(`Generated token en auth.routes.js: ${token}`);
             return res.status(201).json({
                 message:'User autenticado exitosamente...',
                 ownerProfileData:ownerProfileData
             })
                 
        }catch (error) {
            this.loggerManager && this.loggerManager.error(error.message)
            next(error)
        }
    }

    logoutOwner = async(req,res,next)=>{
        try{
            res.clearCookie(process.env.COOKIE_NAME_OWNERS_APP)
            return res.status(200).json({
                message: 'Sesion cerrada exitosamente...'
            })

        }catch(error){
            this.loggerManager && this.loggerManager.error(error.message)
            next(error)
        }
    }
}