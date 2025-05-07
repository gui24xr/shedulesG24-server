import { ExpressServer } from './common/expressServer.js'
import { logger } from './config/logger.config.js'
import errorHandlerMiddleware from './middlewares/handlerError.js'



import {

      pdfRouter,
      authRouter,
      ownersRouter,
      catalogsRouter,
      establishmentsRouter,
      employeesRouter,
      //devRouter,
  } from './routes/index.js'



const routesArray = [
    {path: '/api/auth', router: authRouter},
    {path: '/api/owners', router: ownersRouter},
    {path: '/api/catalogs', router: catalogsRouter},
    {path: '/api/establishments', router: establishmentsRouter},
    {path: '/api/employees', router: employeesRouter}
]





export const server = new ExpressServer({
    port:process.env.SERVER_PORT,
    serverCookiesSign:process.env.SERVER_COOKIES_SIGN,
    logger:logger,
    routerList:routesArray,
    errorHandlerMiddleware:errorHandlerMiddleware
})


//console.log('-- SERVER ROUTES -- \n\n',server.exploreStack(),'\n\n -- SERVER ROUTES END --\n\n')
//console.log(server.getDocs())
