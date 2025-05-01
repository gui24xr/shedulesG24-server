import express from 'express'
import passport from '../config/passport.js'
import { catalogsController } from '../controllers/index.js'

const catalogsRouter = express.Router()

catalogsRouter.get('/business-categories',catalogsController.getBusinessCategories)
catalogsRouter.get('/scheduling-config-type-categories',catalogsController.getSchedulingConfigType)
catalogsRouter.get('/establishments-status-data',catalogsController.getEstablishmentStatus)
catalogsRouter.get('/attendance-modes-data',catalogsController.getAttendanceModes)
catalogsRouter.get('/employee-types-data',catalogsController.getEmployeeTypes)
export default catalogsRouter;
