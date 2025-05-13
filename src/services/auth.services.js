
export default class AuthService{
    constructor({ownersService, authSchema, loggerManager = null,jwtManager,issuedRefreshToken}){
        this.ownersService = ownersService;
        this.issuedRefreshToken = issuedRefreshToken;
        this.authSchema = authSchema || null;
        this.loggerManager = loggerManager;
        this.jwtManager = jwtManager;
    }

    
    ownersHandleLoginOrRegister = async(auth0UserData) => {
        try{
            let authOwner = await this.ownersService.findAndAuthOwner(auth0UserData.email,)
            if (!authOwner){
                authOwner = await this.ownersService.createOwner(auth0UserData,{})
            }

            if (authOwner.status === 'inactive') throw new Error('Owner is inactive')
            const ownerRefreshToken = await this.ownersCreateRefreshToken(authOwner.id)
            const ownerAccessToken = await this.ownersCreateAccessToken(authOwner.id)
            return { ownerRefreshToken, ownerAccessToken, authOwner }
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error al manejar el login o registro del propietario',error);
            throw error;
        }
    }

    ownersHandleCheckSession = async (ownerId) => {
        try{
            const foundedOwner = await this.ownersService.getOwnerById(ownerId)
            if (!foundedOwner) throw new Error('Propietario no encontrado')
            return foundedOwner
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error al verificar la sesion del propietario',error);
            throw error;
        }
    }

    ownersCreateRefreshToken = async (ownerId) => {
        try{
            const foundedOwner = await this.ownersService.getOwnerById(ownerId)
            const tokenPayload = { id:foundedOwner.id}
            const ownerRefreshToken = this.jwtManager.generateToken(
                tokenPayload,
                process.env.OWNERS_REFRESHTOKEN_JWTSIGN,
                { expiresIn: process.env.OWNERS_REFRESHTOKEN_DURATION})
            return ownerRefreshToken
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error al crear el refresh token',error);
            throw error;
        }
    }

    registerRefreshToken = async ({ownerId,refreshToken}) => {
        try{
            //Pendiente de implementar
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error al registrar el refresh token',error);
            throw error; 
        }
    }

    ownersCreateAccessToken = async (ownerId) => {
        try{
            const foundedOwner = await this.ownersService.getOwnerById(ownerId)
            const tokenPayload = { id:foundedOwner.id }
            const ownerAccessToken = this.jwtManager.generateToken(
                tokenPayload,
                process.env.OWNERS_ACCESSTOKEN_JWTSIGN,
                { expiresIn: process.env.OWNERS_ACCESSTOKEN_DURATION})
            await this.registerRefreshToken({ownerId,refreshToken:ownerAccessToken})
            return ownerAccessToken
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error al crear el access token owners',error);
            throw error;
        }
    }

    ownersHandleRefreshToken = async (ownerId) => {
        try{
            //Ahora vamos a necesitar tambien que el topekn no est revocado
            const newOwnerAccessToken = await this.ownersCreateAccessToken(ownerId)
            return newOwnerAccessToken
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error al manejar el refresh token owners',error);
            throw error;
        }
    }

}