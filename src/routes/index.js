import { router as pdfRouter } from '../services/createpdf.js'
import { authDevsRouter } from '../services/auth/auth.devs.routes.js'
import { authUsersRouter } from '../services/auth/auth.users.routes.js'
import devRouter from './dev.routes.js'

export {
    devRouter,
    pdfRouter,
    authDevsRouter ,
    authUsersRouter,
}