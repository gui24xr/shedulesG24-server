import jwt from 'jsonwebtoken'

export default class JwtManager{
    constructor(loggerManager = null){
        this.loggerManager = loggerManager;
    }

    generateToken(payload, jwtSecretKey, jwtOptions){
        //aca validar la entrada
        try{
            if(!payload || !jwtSecretKey || !jwtOptions) throw new Error('Faltan datos para generar el token');
            return jwt.sign(payload,jwtSecretKey, jwtOptions);
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error al generar el token',error);
            throw error      
        }
       
    }

    verifyToken(token, jwtSecretKey){
        try{
            if(!token || !jwtSecretKey) throw new Error('Faltan datos para verificar el token');
            return jwt.verify(token, jwtSecretKey);
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error al verificar el token',error);
            throw error      
        }
    }
}
