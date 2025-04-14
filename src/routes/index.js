import { router as pdfRouter } from '../services/createpdf.js'


import { developmentRouter } from './development.routes.js'

import authRouter from './auth.routes.js'
import ownerRouter from './owner.routes.js'

export {
   
    pdfRouter,
  
    developmentRouter,
    authRouter,
    ownerRouter
}