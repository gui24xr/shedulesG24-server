import mongoose from 'mongoose'

const DB_URL = process.env.DB_URL


export async function connectToDatabase(){
    try{
        await mongoose.connect(DB_URL)
        console.log('Conectado a la base de datos...!')
    }catch(err){
        console.error('Error al conectarse a la base datos.')
        throw err
    }

}