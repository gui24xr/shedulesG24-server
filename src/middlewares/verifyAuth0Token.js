import {auth }from'express-oauth2-jwt-bearer'

// Middleware para verificar el token
const verifyAuth0Token = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL:process.env.AUTH0_ISSUERBASEURL,
    tokenSigningAlg: 'RS256'
  })


  export{
    verifyAuth0Token, 
  } 


