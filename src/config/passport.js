import passport from 'passport'
import jwt from 'passport-jwt'
import { loggerManager } from '../managers/index.js'


const extractRefreshTokenFromSignedCookie = (req, cookieName) => {
    if (req?.signedCookies && req.signedCookies[cookieName]) {
        return req.signedCookies[cookieName];
    }
    return null;
};

passport.use("extractOwnerRefreshToken", new jwt.Strategy({
    secretOrKey: process.env.OWNERS_REFRESHTOKEN_JWTSIGN,
    passReqToCallback: true,
    jwtFromRequest: jwt.ExtractJwt.fromExtractors([
        (req) => extractRefreshTokenFromSignedCookie(req, process.env.OWNERS_REFRESHTOKEN_COOKIENAME)
    ])
}, async (req, jwtPayload, done) => {
    try {
        console.log('ENTRA AQUI A PASSPORT OWNER REFRESH TOKEN')
        loggerManager.debug('Payload (refresh token, owners app):', jwtPayload);
        return done(null, { type: 'owner', owner: { ...jwtPayload } });
    } catch (error) {
        loggerManager.error('Error en passport (refresh strategy):', error);
        return done(error);
    }
}));


passport.use("extractTenantRefreshToken", new jwt.Strategy({
    secretOrKey: process.env.TENANTS_REFRESHTOKEN_JWTSIGN,
    passReqToCallback: true,
    jwtFromRequest: jwt.ExtractJwt.fromExtractors([
        (req) => extractRefreshTokenFromSignedCookie(req, process.env.TENANTS_REFRESHTOKEN_COOKIENAME)
    ])
}, async (req, jwtPayload, done) => {
    try {
        loggerManager.debug('Payload (refresh token, tenants app):', jwtPayload);
        return done(null, { type: 'tenant', tenant: { ...jwtPayload } });
    } catch (error) {
        loggerManager.error('Error en passport (refresh strategy):', error);
        return done(error);
    }
}));



passport.use("extractOwnerAccessToken", new jwt.Strategy({
    secretOrKey: process.env.OWNERS_ACCESSTOKEN_JWTSIGN,
    passReqToCallback: true,
    jwtFromRequest: jwt.ExtractJwt.fromExtractors([
        (req) => extractRefreshTokenFromSignedCookie(req, process.env.OWNERS_ACCESSTOKEN_COOKIENAME)
    ])
}, async (req, jwtPayload, done) => {
    try {
        loggerManager.debug('Payload (Access token, Owners app):', jwtPayload);
        console.log('ENTRA AQUI A PASSPORT OWNER ACCESS TOKEN')
        console.log('Payload (Access token, owners app):', jwtPayload);
        return done(null, { type: 'tenant', owner: { ...jwtPayload } });
    } catch (error) {
        loggerManager.error('Error en passport (refresh strategy):', error);
        return done(error);
    }
}));



passport.use("extractTenantAccessToken", new jwt.Strategy({
    secretOrKey: process.env.TENANTS_ACCESSTOKEN_JWTSIGN,
    passReqToCallback: true,
    jwtFromRequest: jwt.ExtractJwt.fromExtractors([
        (req) => extractRefreshTokenFromSignedCookie(req, process.env.TENANTS_ACCESSTOKEN_COOKIENAME)
    ])
}, async (req, jwtPayload, done) => {
    try {
        loggerManager.debug('Payload access token, tenants app):', jwtPayload);
        return done(null, { type: 'tenant', tenant: { ...jwtPayload } });
    } catch (error) {
        loggerManager.error('Error en passport (refresh strategy):', error);
        return done(error);
    }
}));


export default passport



/*
/--------------------------------------------------------------------------------


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
}))*/
