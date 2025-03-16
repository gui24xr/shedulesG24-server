import passport from 'passport'
import { logger } from './logger.config.js';
import jwt from 'passport-jwt'
import { UsersManager } from '../manager/users.manager.js';


const usersManager = new UsersManager()

const cookieExtractor = (req) => {
    let token = null;
    if(req && req.cookies) {
        token = req.signedCookies[process.env.SERVER_COOKIES_JWT_NAME]
    }
    //console.log('Token: token en cookie extractor: ', token,)
    return token;
}

passport.use("jwt", new jwt.Strategy({
    jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractor]),
    secretOrKey: process.env.SERVER_JWT_SIGN
}, async (jwt_payload, done) => {
    try{
        //Si llego a aca entonces ya pasport agarro la cookie, comprono y extrajo el token y puso en jwtPayload la info del token. Busco el user en la BD con la info del jwtPayload.
        const foundUser = await usersManager.getUserById(jwt_payload.userId)
        //El metodo done es el que pone en req.user el user lo que queremos, nosotros pondremos el foundUser
        return done(null, foundUser);
    }catch(error){
         logger.error({ 
            message: error.message,
            name: error.name,
            stack: error.stack
          });
        return done(error);
    }
}))


export default passport