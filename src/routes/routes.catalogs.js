import express from 'express'
import passport from '../config/passport.js'
import { catalogsController } from '../controllers/index.js'

const catalogsRouter = express.Router()

catalogsRouter.get('/establishment-categories',catalogsController.getEstablishmentCategories)


export default catalogsRouter;
