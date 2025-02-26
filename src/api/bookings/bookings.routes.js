import express from  'express'
import { BookingsControllers } from './bookings.controllers.js'
export const router = express.Router()

const bookingsControllers = new BookingsControllers()
const defaultFunction = (req,res,next) => {res.send("Default function")}

router.get('/:bid?',bookingsControllers.getBookings)
router.post('/', bookingsControllers.createEmptyBooking)
router.delete('/',bookingsControllers.deleteBookings,defaultFunction)
router.put('/:bid',bookingsControllers.updateBookingStatus)