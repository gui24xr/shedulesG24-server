
export default class AuthController {
    constructor({ authService, loggerManager = null }) {
        this.authService = authService;
        this.loggerManager = loggerManager;
    }

    ownersHandleLoginOrRegister = async (req, res, next) => {
        try {
            const { ownerRefreshToken, ownerAccessToken } = await this.authService.ownersHandleLoginOrRegister({
                authProvider: 'auth0', ...req.auth0UserData
            });
            this.loggerManager && this.loggerManager.debug(`Tokens generados: OwnerAccessToken: ${ownerAccessToken} \n y OwnerRefreshToken: ${ownerRefreshToken}`);

        
            res.cookie(process.env.OWNERS_REFRESHTOKEN_COOKIENAME, ownerRefreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                secure: false,
                signed: true
            })

            res.cookie(process.env.OWNERS_ACCESSTOKEN_COOKIENAME, ownerAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                secure: false,
                signed: true
            })

            this.loggerManager && this.loggerManager.debug(`OwnerRefreshToken: ${ownerRefreshToken} // Owner AccessToken: ${ownerAccessToken}`);
            return res.status(201).json({
                message: 'User autenticado exitosamente...',
            })

        } catch (error) {
            this.loggerManager && this.loggerManager.error(error.message)
            next(error)
        }
    }

    ownersHandleRefreshToken = async (req, res, next) => {
        try {
            const { ownerId } = req.user.owner.id;
            const newOwnerAccessToken = await this.authService.ownersHandleRefreshToken(ownerId)
            res.cookie(process.env.OWNERS_ACCESSTOKEN_COOKIENAME, newOwnerAccessToken, {
                httpOnly: true,
                secure: true,
                sameSite: "lax",
                secure: false,
                signed: true
            })
            this.loggerManager && this.loggerManager.debug(`OwnerAccessToken: ${newOwnerAccessToken}`);
            return res.status(200).json({
                message: 'Owner AccessToken generado exitosamente...'
            })
        } catch (error) {
            this.loggerManager && this.loggerManager.error(error.message)
            next(error)
        }
    }


    ownersHandleLogout = async (req, res, next) => {
        try {
            res.clearCookie(process.env.OWNERS_ACCESSTOKEN_COOKIENAME)
            res.clearCookie(process.env.OWNERS_REFRESHTOKEN_COOKIENAME)
            return res.status(200).json({
                message: 'Sesion cerrada exitosamente...'
            })


        } catch (error) {
            this.loggerManager && this.loggerManager.error(error.message)
            next(error)
        }
    }

    tenantsHandleLogout = async (req, res, next) => {
        try {
            res.clearCookie(process.env.TENANTS_ACCESSTOKEN_COOKIENAME)
            res.clearCookie(process.env.TENANTS_REFRESHTOKEN_COOKIENAME)
            return res.status(200).json({
                message: 'Sesion cerrada exitosamente...'
            })
        } catch (error) {
            this.loggerManager && this.loggerManager.error(error.message)
            next(error)
        }
    }

    
}

