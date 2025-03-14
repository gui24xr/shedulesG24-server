import express from  'express'
import { bookingsControllers } from './bookings.controller.js'
import { checkRole } from '../../middlewares/checkRole.js'
import passport from '../../config/passport.js'


export const bookingsDevRouter = express.Router()

bookingsDevRouter.use(passport.authenticate("jwt",{session:false}))
bookingsDevRouter.use(checkRole(['dev']))

bookingsDevRouter.post('/', bookingsControllers.create)
bookingsDevRouter.get('/:id',bookingsControllers.getOne)
bookingsDevRouter.get('/',bookingsControllers.getMany)
bookingsDevRouter.delete('/', bookingsControllers.deleteManyById)
bookingsDevRouter.put('/:id', bookingsControllers.updateById)

