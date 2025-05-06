import passport from 'passport'
import jwt from 'passport-jwt'
import { loggerManager } from '../managers/index.js'
import { tenantsAppsUsersService, ownersService, authService } from '../services/index.js'



const extractRefreshTokenFromSingnedCookies = (req, cookiesNamesList) => {
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



  
passport.use("extact_refresh_token", new jwt.Strategy({
    secretOrKey: process.env.JWT_SECRET_KEY,
    passReqToCallback: true,
    jwtFromRequest: jwt.ExtractJwt.fromExtractors([
        (req)=> extractRefreshTokenFromSingnedCookies(req, [process.env.COOKIE_REFRESH_TOKEN_TENANT_APP,process.env.COOKIE_REFRESH_TOKEN_OWNERS_APP])
    ]),
}, async (req,jwt_payload, done) => {
    try{
        const jwtSourceCookieName = req.jwtSourceCookieName; //-->> De que cookie vino el token.
        if(jwtSourceCookieName === process.env.COOKIE_REFRESH_TOKEN_OWNERS_APP){
            loggerManager.debug('payload access token extract refresh token owners app: ', jwt_payload)
            return done(null, {type: 'owner', owner: {...jwt_payload}});
        }

        /*
        if(jwtSourceCookieName === process.env.COOKIE_NAME_TENANT_APP){
            const foundUser = await tenantsAppsUsersService.findById(jwt_payload.userId)
            loggerManager.debug('foundUser in passport: ', foundUser)
            return done(null, {type: 'tenant', user: foundUser});
        }
        return done(null, false);
        */
    }catch(error){
         loggerManager.error('Error en passport: ', error)
        return done(error);
    }
}))



const extractAccessTokenFromSingnedCookies = (req, cookiesNamesList) => {
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



  
passport.use("access_token", new jwt.Strategy({
    secretOrKey: process.env.JWT_SECRET_KEY,
    passReqToCallback: true,
    jwtFromRequest: jwt.ExtractJwt.fromExtractors([
        (req)=> extractAccessTokenFromSingnedCookies(req, [process.env.COOKIE_ACCESS_TOKEN_OWNERS_APP,process.env.COOKIE_ACCESS_TOKEN_TENANT_APP])
    ]),
}, async (req,jwt_payload, done) => {
    try{
        const jwtSourceCookieName = req.jwtSourceCookieName; //-->> De que cookie vino el token.
        if(jwtSourceCookieName === process.env.COOKIE_ACCESS_TOKEN_OWNERS_APP){
            loggerManager.debug('payload access token owners app: ', jwt_payload)
            return done(null, {type: 'owner', owner: {...jwt_payload}});
        }
        if(jwtSourceCookieName === process.env.COOKIE_ACCESS_TOKEN_TENANT_APP){
            loggerManager.debug('payload access token tenant app: ', jwt_payload)
            return done(null, {type: 'tenant', user: {...jwt_payload}});
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
    jwtFromRequest: jwt.ExtractJwt.fromExtractors([(req)=> getJWTfromSignedCookie(req, process.env.COOKIE_NAME_TENANT_APP)]),
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