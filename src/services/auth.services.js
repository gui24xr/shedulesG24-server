import { logger } from '../config/logger.config.js'
import jwt from 'jsonwebtoken'

export default class AuthService{
    constructor(usersService){
        this.usersService = usersService;
    }

    handleLoginOrRegisterOwner = async(auth0UserData) => {
        try{
            const auth0UserEmail = auth0UserData.email;
            let authUser = await this.usersService.findAndAuthUser({ email: auth0UserEmail,role:'owner' })

            if (!authUser) {
                authUser = await this.usersService.createUserOwnerAndHisCompany({
                    authProvider: 'auth0',
                    email:auth0UserEmail,
                   })
                }

                const token = jwt.sign({
                    userId:authUser.id,
                    role: authUser.role,
                    enabled: authUser.enabled
                },
                process.env.SERVER_JWT_SIGN,{expiresIn: "1h"})

                return { token, user: authUser }
        }catch(error){
            logger.error('Error al manejar el login o registro del propietario',error);
            throw error;
        }
    }
}