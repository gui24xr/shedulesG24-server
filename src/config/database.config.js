import mongoose from 'mongoose'
import { logger } from './logger.config.js'


export async function connectToDatabase(){
    try{
        
        await mongoose.connect(process.env.DB_URL_LOCAL)
        logger.info('Conectado a la base de datos...!')
    }catch(err){
        logger.error('Error al conectarse a la base datos.')
        throw err
    }

}