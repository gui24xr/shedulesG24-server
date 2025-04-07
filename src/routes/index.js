import { router as pdfRouter } from '../services/createpdf.js'
import { authDevsRouter } from '../services/auth/auth.devs.routes.js'
import { authUsersRouter } from '../services/auth/auth.users.routes.js'
import { developmentRouter } from './development.routes.js'
import { authRouter } from './auth.routes.js'
export {
   
    pdfRouter,
    authDevsRouter ,
    authUsersRouter,
    developmentRouter,
    authRouter
}