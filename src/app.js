import { ExpressServer } from './common/expressServer.js'
import { logger } from './config/logger.config.js'
import errorHandlerMiddleware from './middlewares/handlerError.js'
import { developmentRouter } from './routes/development.routes.js'


import {

      pdfRouter,
      authRouter,
      ownerRouter,
      //devRouter,
  } from './routes/index.js'



const routesArray = [
     
    //{path: '/api/docs', router: pdfRouter},
    //{path: '/api/auth', router: authDevsRouter},
    //{path: '/api/auth', router: authUsersRouter},
    //{path: '/', router: devRouter},
    {path: '/developments/api', router: developmentRouter},
    {path: '/api/auth', router: authRouter},
    {path: '/api/owners', router: ownerRouter}
]




export const server = new ExpressServer({
    port:process.env.PORT,
    serverCookiesSign:process.env.SERVER_COOKIES_SIGN,
    logger:logger,
    routerList:routesArray,
    errorHandlerMiddleware:errorHandlerMiddleware
})


//console.log('-- SERVER ROUTES -- \n\n',server.exploreStack(),'\n\n -- SERVER ROUTES END --\n\n')
//console.log(server.getDocs())
