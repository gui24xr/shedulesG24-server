import passport from 'passport'
import { logger } from './logger.config.js';
import jwt from 'passport-jwt'
import { usersService, ownersService } from '../services/index.services.js'



const cookieExtractorClientsApp = (req) => {
    let token = null;
    if(req && req.cookies) {
        token = req.signedCookies[process.env.COOKIE_NAME_CLIENTS_APP]
    }
    console.log('Token: token en cookie extractor: ', token,)
    return token;
}

passport.use("jwt_clients_app", new jwt.Strategy({
    jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractorClientsApp]),
    secretOrKey: process.env.JWT_SECRET_KEY
}, async (jwt_payload, done) => {
    try{
        //Si llego a aca entonces ya pasport agarro la cookie, comprono y extrajo el token y puso en jwtPayload la info del token. Busco el user en la BD con la info del jwtPayload.
        const foundUser = await usersService.findById(jwt_payload.userId)
        //El metodo done es el que pone en req.user el user lo que queremos, nosotros pondremos el foundUser
        console.log('foundUser en passport: ', { appClientUser: foundUser })
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


const cookieExtractorOwnersApp = (req) => {
    let token = null;
    if(req && req.cookies) {
        token = req.signedCookies[process.env.COOKIE_NAME_OWNERS_APP]
    }
    console.log('Token: token en cookie extractor: ', token,)
    return token;
}

passport.use("jwt_owners_app", new jwt.Strategy({
    jwtFromRequest: jwt.ExtractJwt.fromExtractors([cookieExtractorOwnersApp]),
    secretOrKey: process.env.JWT_SECRET_KEY 
}, async (jwt_payload, done) => {
    try{
        //Si llego a aca entonces ya pasport agarro la cookie, comprono y extrajo el token y puso en jwtPayload la info del token. Busco el user en la BD con la info del jwtPayload.
        const foundOwner = await ownersService.getOwnerById(jwt_payload.ownerId)
        //El metodo done es el que pone en req.user el user lo que queremos, nosotros pondremos el foundUser
        console.log('foundOwner en passport: ', foundOwner)
        return done(null, { owner: foundOwner });
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