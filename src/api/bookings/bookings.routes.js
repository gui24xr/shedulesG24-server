import express from  'express'
import { BookingsControllers } from './bookings.controllers.js'
export const router = express.Router()

const bookingsControllers = new BookingsControllers()
const defaultFunction = (req,res,next) => {res.send("Default function")}

router.get('/:bid',bookingsControllers.getOne)
router.get('/',bookingsControllers.getMany)
router.post('/', bookingsControllers.createEmptyBooking)
router.delete('/',bookingsControllers.deleteBookings,defaultFunction)
router.put('/:bid/status',bookingsControllers.updateBookingStatus)
router.put('/:bid/note',bookingsControllers.updateBookingNote)