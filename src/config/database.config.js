import mongoose from 'mongoose'
import { logger } from './logger.config.js'

// config/database.js
const getDatabaseUrl = () => {
    if (process.env.NODE_ENV === 'development') {
      return process.env.DEV_DATABASE_URL;
    }
    return process.env.PROD_DATABASE_URL;
  };

export async function connectToDatabase(){
    try{
        
        await mongoose.connect(process.env.DB_URL_LOCAL)
        logger.info('Conectado a la base de datos...!')
    }catch(err){
        logger.error('Error al conectarse a la base datos.')
        throw err
    }

}