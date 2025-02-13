import passport from 'passport'
import jwt from 'passport-jwt'

import { UsersService } from '../api/users/users.service.js';

const usersService = new UsersService()

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
        //Si llego a aca entonces ya pasport agarro la cookie, comprono y extrajo el token y puso en jwtPayload la info del token
        //console.log('Pase por el calback de passport JWT y este es el payload del token: ', jwt_payload)
        //De la info del token tomo userID que es lo que me interesa para buscar el user en la DB
        const foundUser = await usersService.getUserById(jwt_payload.userId)
        //console.log('Found Usr: ', foundUser)
        return done(null, foundUser);
    }catch(error){
        console.log('Erroe en ballbackd: ', error)
        return done(error);
    }
}))


export default passport