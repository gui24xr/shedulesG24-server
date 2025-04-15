import { logger } from '../config/logger.config.js'
import jwt from 'jsonwebtoken'

export default class AuthService{
    constructor({ownersService, authSchema}){
        this.ownersService = ownersService;
        this.authSchema = authSchema || null;
    }

    handleLoginOrRegisterOwner = async(auth0UserData) => {
        try{
            const auth0UserEmail = auth0UserData.email;
            const authUser = await this.ownersService.findOrCreateAndSetLastLoginToOwner({auth0UserEmail,authProvider:'auth0'})
            const token = jwt.sign(
                { ownerId: authUser.id, lastLogin:authUser.lastLogin },
                process.env.JWT_SECRET_KEY,
                {expiresIn: "1h"})
            return { 
                token, 
                ownerProfileData: {
                    email:authUser.email,
                    status:authUser.status,
                    firstName:authUser.firstName,
                    lastName:authUser.lastName,
                    phoneNumber:authUser.phoneNumber,
                    profilePicture:authUser.profilePicture,
                    lastLogin:authUser.lastLogin,
                    createdAt:authUser.createdAt,
                    updatedAt:authUser.updatedAt,
                                    } }
        }catch(error){
            logger.error('Error al manejar el login o registro del propietario',error);
            throw error;
        }
    }

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