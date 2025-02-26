import { BookingsRepository } from "./bookings.repository.js";
import { bookingSchemma } from "./schema.js";

const bookingsRepository = new BookingsRepository()
export class BookingsControllers{
    
    async createEmptyBooking(req,res,next) {
        try{
            bookingSchemma.parse(req.body)
            const {customerId,sheduleId,slotId,note} = req.body
            const createdBooking = await bookingsRepository.createPendingBooking({customerId,sheduleId,slotId,note})
            return res.status(201).json({booking: createdBooking})
        }catch(error){
            next(error)
        }
    }

    async getBookings(req,res,next) {
        try{
            const {bid:bookingId} = req.params
            if (bookingId){
                return res.status(200).json({booking: await bookingsRepository.getBookingById(bookingId)}) 
            }
            return res.status(200).json({bookings: await bookingsRepository.getBookings()})
        }catch(error){
            next(error)
        }
    }

    async deleteBookings(req,res,next) {
        try{
            const bookingsIdList = req.query.ids?.split(",")
            const result = await bookingsRepository.deleteBookings(bookingsIdList)
            return res.status(201).json({message: `Se han borrado ${result} bookings`})
        }catch(error){
            next(error)
        }
    }

    async updateBookingStatus(req,res,next) {
        try{
            const validateSchema = bookingSchemma.pick({id:true,status:true})
            const {bid:bookingId} = req.params
            const {status} = req.body
            validateSchema.parse({id: bookingId, status:status})
            const result = await bookingsRepository.updateBookingStatus(bookingId,status)
            return res.status(201).json({booking: result})
        }catch(error){
            next(error)
        }
    }
}