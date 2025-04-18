import { router as pdfRouter } from '../managers/createpdf.js'



import authRouter from './routes.auth.js'
import ownersRouter from './routes.owners.js'
import catalogsRouter from './routes.catalogs.js'
import establishmentsRouter from './routes.establishments.js'
export {
   
    pdfRouter,
  

    authRouter,
    ownersRouter,
    catalogsRouter,
    establishmentsRouter
}