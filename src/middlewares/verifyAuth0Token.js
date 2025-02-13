import {auth }from'express-oauth2-jwt-bearer'
import axios from 'axios'
// Middleware para verificar el token
const verifyAuth0Token = auth({
    audience: 'http://ShedulesAndAlarmsAPI',
    issuerBaseURL: 'https://dev-8puz7l6ml0moiqni.us.auth0.com/',
    tokenSigningAlg: 'RS256'
  })


  

  export{
    verifyAuth0Token, 
  } 


