
export default class AuthService{
    constructor({ownersService, authSchema, loggerManager = null,jwtManager}){
        this.ownersService = ownersService;
        this.authSchema = authSchema || null;
        this.loggerManager = loggerManager;
        this.jwtManager = jwtManager;
    }

    
    handleLoginOrRegisterOwner = async(auth0UserData) => {
        try{
            let authOwner = await this.ownersService.findAndAuthOwner(auth0UserData.email,)
            if (!authOwner){
                authOwner = await this.ownersService.createOwner(auth0UserData,{})
            }

            if (authOwner.status === 'inactive') throw new Error('Owner is inactive')
            const refreshToken = await this.createRefreshToken(authOwner.id)
            const accessToken = await this.createAccessToken(authOwner.id)
            return {accessToken: accessToken, refreshToken: refreshToken}
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error al manejar el login o registro del propietario',error);
            throw error;
        }
    }


    createRefreshToken = async (ownerId) => {
        try{
            const foundedOwner = await this.ownersService.getOwnerById(ownerId)
            const tokenPayload = { id:foundedOwner.id}
            const refreshToken = this.jwtManager.generateToken(tokenPayload,process.env.JWT_SECRET_KEY,{ expiresIn: "48h"})
            return refreshToken
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error al crear el refresh token',error);
            throw error;
        }
    }

    createAccessToken = async (ownerId) => {
        try{
            const foundedOwner = await this.ownersService.getOwnerById(ownerId)
            const tokenPayload = { id:foundedOwner.id }
            const accessToken = this.jwtManager.generateToken(tokenPayload,process.env.JWT_SECRET_KEY,{ expiresIn: "15m"})
            return accessToken
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error al crear el access token',error);
            throw error;
        }
    }

    handleRefreshToken = async (ownerId) => {
        try{
            const newAccessToken = await this.createAccessToken(ownerId)
            return newAccessToken
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error al manejar el refresh token',error);
            throw error;
        }
    }

    /*
    handleLoginOrRegisterOwner = async(auth0UserData) => {
        try{
            const auth0UserEmail = auth0UserData.email;
            const authUser = await this.ownersService.findOrCreateAndSetLastLoginToOwner({auth0UserEmail,authProvider:'auth0'})
            const token = this.jwtManager.generateToken(
                    { ownerId: authUser.id, lastLogin:authUser.lastLogin },
                     process.env.JWT_SECRET_KEY,
                    { expiresIn: "1h"})
            return { 
                token, 
                ownerProfileData: {
                    email:authUser.email,
                    status:authUser.status,
                    firstName:authUser.profile.firstName,
                    lastName:authUser.profile.lastName,
                    phoneNumber:authUser.profile.phoneNumber,
                    profilePicture:authUser.profile.profilePicture,
                    lastLogin:authUser.lastLogin,
                    createdAt:authUser.createdAt,
                    updatedAt:authUser.updatedAt,
                                    } }
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error al manejar el login o registro del propietario',error);
            throw error;
        }
    }
        */

    /*
    Guardado para futra creacion de employess, esto si van a usar login-register
    handleLoginOrRegisterOwner = async(auth0UserData) => {
        try{
            const auth0UserEmail = auth0UserData.email;
            let authUser = await this.usersService.findAndAuthUser({ email: auth0UserEmail,role:'owner' })

            if (!authUser) {
                authUser = await this.usersService.createUserOwnerAndHisEstablishment({
                    authProvider: 'auth0',
                    email:auth0UserEmail,
                   })
                }

            const token = jwt.sign({...authUser.tokenData},process.env.SERVER_JWT_SIGN,{expiresIn: "1h"})
            return { token, ownerStatus:authUser.ownerStatus }
        }catch(error){
            logger.error('Error al manejar el login o registro del propietario',error);
            throw error;
        }
    }
    */
}