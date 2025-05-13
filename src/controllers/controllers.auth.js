
export default class AuthController {
    constructor({ authService, loggerManager = null }) {
        this.authService = authService;
        this.loggerManager = loggerManager;
    }

    ownersHandleLoginOrRegister = async (req, res, next) => {
        try {
            const { ownerRefreshToken, ownerAccessToken, authOwner } = await this.authService.ownersHandleLoginOrRegister({
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
                payload: authOwner,
                message: 'User autenticado exitosamente...',
            })

        } catch (error) {
            this.loggerManager && this.loggerManager.error(error.message)
            next(error)
        }
    }

    ownersCheckSession = async (req, res, next) => {
        try {
            //Si llego a aca es xq passport vio ok el token de acceso
            //Pero igualmente entrego data de perfil del owner
            const { id:ownerId } = req.user.owner
            const ownerData = await this.authService.ownersHandleCheckSession(ownerId)
            res.status(200).json({
                message: 'Session valida...',
                payload: ownerData
            })
        } catch (error) {
            this.loggerManager && this.loggerManager.error(error.message)
            next(error)
        }
    }

    ownersHandleRefreshToken = async (req, res, next) => {
        try {
            const { id:ownerId } = req.user.owner
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

