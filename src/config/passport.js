import passport from 'passport'
import jwt from 'passport-jwt'
import { loggerManager } from '../managers/index.js'
import { usersService, ownersService } from '../services/index.js'

const getJWTfromListOfSignedCookie = (req, cookiesNamesList) => {
    let extractedToken = null;
            for (const cookieName of cookiesNamesList) {
                if (req?.signedCookies?.[cookieName]) {
                extractedToken = req.signedCookies[cookieName];
                req.jwtSourceCookieName = cookieName;
                break; 
                }
            }
        if(extractedToken){
            return extractedToken;
        }
        return null;
  };


passport.use("jwt_all_clientesApp", new jwt.Strategy({
    secretOrKey: process.env.JWT_SECRET_KEY,
    passReqToCallback: true,
    jwtFromRequest: jwt.ExtractJwt.fromExtractors([
        (req)=> getJWTfromListOfSignedCookie(req, [process.env.COOKIE_NAME_CLIENTS_APP,process.env.COOKIE_NAME_OWNERS_APP])
    ]),
}, async (req,jwt_payload, done) => {
    try{
        const jwtSourceCookieName = req.jwtSourceCookieName; //-->> De que cookie vino el token.
        if(jwtSourceCookieName === process.env.COOKIE_NAME_OWNERS_APP){
            const foundOwner = await ownersService.getOwnerById(jwt_payload.ownerId)
            return done(null, { authData:{owner: foundOwner} });
        }
        if(jwtSourceCookieName === process.env.COOKIE_NAME_CLIENTS_APP){
            const foundUser = await usersService.findById(jwt_payload.userId)
            loggerManager.debug('foundUser in passport: ', foundUser)
            return done(null, { authData:{user: foundUser} });
        }
        return done(null, false);
    }catch(error){
         loggerManager.error('Error en passport: ', error)
        return done(error);
    }
}))



export default passport


/*

const getJWTfromSignedCookie = (req, cookieName) => {
    if (req?.signedCookies?.[cookieName]) {
      const extractedToken = req.signedCookies[cookieName];
      loggerManager.debug(`Token extraído de cookie "${cookieName}": ${extractedToken}`);
      return extractedToken;
    }
    loggerManager.debug(`No se encontró token en cookie "${cookieName}"`);
    return null;
  };

passport.use("jwt_clients_app", new jwt.Strategy({
    jwtFromRequest: jwt.ExtractJwt.fromExtractors([(req)=> getJWTfromSignedCookie(req, process.env.COOKIE_NAME_CLIENTS_APP)]),
    secretOrKey: process.env.JWT_SECRET_KEY
}, async (jwt_payload, done) => {
    try{
        //Si llego a aca entonces ya pasport agarro la cookie, comprono y extrajo el token y puso en jwtPayload la info del token. Busco el user en la BD con la info del jwtPayload.
        const foundUser = await usersService.findById(jwt_payload.userId)
        //El metodo done es el que pone en req.user el user lo que queremos, nosotros pondremos el foundUser
        loggerManager.debug('foundUser en passport: ', foundUser)
        return done(null, foundUser);
    }catch(error){
         loggerManager.error('Error en passport: ', error)
        return done(error);
    }
}))


passport.use("jwt_owners_app", new jwt.Strategy({
    jwtFromRequest: jwt.ExtractJwt.fromExtractors([(req)=> getJWTfromSignedCookie(req, process.env.COOKIE_NAME_OWNERS_APP)]),
    secretOrKey: process.env.JWT_SECRET_KEY 
}, async (jwt_payload, done) => {
    try{
        //Si llego a aca entonces ya pasport agarro la cookie, comprono y extrajo el token y puso en jwtPayload la info del token. Busco el user en la BD con la info del jwtPayload.
        const foundOwner = await ownersService.getOwnerById(jwt_payload.ownerId)
        //El metodo done es el que pone en req.user el user lo que queremos, nosotros pondremos el foundUser
        //loggerManager.debug('foundOwner en passport: ', foundOwner)
        return done(null, { owner: foundOwner });
    }catch(error){
        loggerManager.error('Error en passport: ', error)
        return done(error);
    }
}))
*/