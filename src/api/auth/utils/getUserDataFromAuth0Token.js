import axios from 'axios'
import {auth }from'express-oauth2-jwt-bearer'

// Middleware para verificar el token
export const verifyAuth0Token = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL:process.env.AUTH0_ISSUERBASEURL,
    tokenSigningAlg: 'RS256'
  })






export const getUserDataFromAuth0Token = async (requestHeaderAuthorization) => {
    //console.log('Pasando x ge token', req.headers.authorization)
    try{
        const response =  await axios.get(`${process.env.AUTH0_ISSUERBASEURL}/userinfo`, {
            headers: {
                Authorization: requestHeaderAuthorization
            }
        });
        return {
          email:response.data.email,
          userName: response.data.nickname,
          firstName: response.data.given_name,
          lastName: response.data.family_name,
          profilePicture: response.data.picture
        }
    }catch(error){
        console.error(error)
        throw new Error('No se pudieron extraer los datos desde el servicio de autorizacion externo...')
    }
  }


