import axios from 'axios'
import { logger } from '../config/logger.config.js'
import {auth }from'express-oauth2-jwt-bearer'

// Middleware para verificar el token
const verifyAuth0Token = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL:process.env.AUTH0_ISSUERBASEURL,
    tokenSigningAlg: 'RS256'
  })



const getUserDataFromAuth0Token = async (req,res,next) => {
   
    try{
        const response =  await axios.get(`${process.env.AUTH0_ISSUERBASEURL}/userinfo`, {
            headers: {
                Authorization: req.headers.authorization
            }
        });

        console.log('User de auth0: ', response.data)
        
        req.auth0UserData = {
          email:response.data.email,
          userName: response.data.nickname,
          firstName: response.data.given_name,
          lastName: response.data.family_name,
        }

        return  next()
    }catch(error){
        logger.error(error)
        next(new Error('No se pudieron extraer los datos desde el servicio de autorizacion externo...'))
    }
  }


  const verifyAuth0TokenAndGetUserData = [verifyAuth0Token,getUserDataFromAuth0Token]

  export default verifyAuth0TokenAndGetUserData;
