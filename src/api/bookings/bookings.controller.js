
import { RequestControllers } from "../../common/requestController.js";
import { bookingSchema } from "./bookings.schema.js";
import { bookingsRepository } from "./bookings.repository.js"


class BookingsControllers extends RequestControllers{
    constructor({ repository, validateSchema,  }) {
        super({ repository, validateSchema })
    }
}


export const bookingsControllers = new BookingsControllers({
    repository: bookingsRepository,
    validateSchema: bookingSchema
})
    


/*
const bookingsRepository = new BookingsRepository()
export class BookingsControllers{
    
    async createEmptyBooking(req,res,next) {
        try{
            bookingSchema.createSchema.parse(req.body)
            const createdBooking = await bookingsRepository.createPendingBooking(req.body)
            return res.status(201).json({...createdBooking})
        }catch(error){
            next(error)
        }
    }

    async getOne(req,res,next) {
        try{
           const {bid:bookingId} = req.params
           return res.status(200).json({...await bookingsRepository.getBookingById(bookingId)}) 
        }catch(error){
            next(error)
        }
    }

    async getMany(req,res,next) {
        try{
            if (Object.keys(req.query).length>0){
                bookingSchema.querySchema.parse(req.query)
                return res.status(200).json([...await bookingsRepository.getBookings(req.query)])
            }
            return res.status(200).json([...await bookingsRepository.getBookings({})])
        }catch(error){
            next(error)
        }
    }

    async deleteBookings(req,res,next) {
        try{
            const bookingsIdList = req.query.ids?.split(",")
            await bookingsRepository.deleteBookings(bookingsIdList)
            return res.status(204)
        }catch(error){
            next(error)
        }
    }

    async updateBookingStatus(req,res,next) {
        try{
         console.log(req.body)
           const {bid:bookingId} = req.params
           bookingSchema.updateStatusSchema.parse(req.body)
           const result = await bookingsRepository.updateBookingStatus(bookingId,req.body)
            return res.status(201).json({...result})
        }catch(error){
            next(error)
        }
    }

    async updateBookingNote(req,res,next) {
        try{
            const {bid:bookingId} = req.params
            bookingSchema.updateNoteSchema.parse(req.body)
            const result = await bookingsRepository.updateBookingNote(bookingId,req.body)
            return res.status(201).json({...result})
        }catch(error){
            next(error)
        }
    }
}

*/