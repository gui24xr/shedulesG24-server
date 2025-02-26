import { Booking } from "../../database/models/models.booking.js"

export class BookingsRepository{
    async createPendingBooking({customerId,sheduleId,slotId,note}){
        try{
            const newBooking = await Booking.create({
                customer: customerId,
                sheduleId: sheduleId || null,
                slotId: slotId || null,
                note:note || null
            })
            const populatedBooking = await newBooking.populate('customer')
            return this.getMappedBooking(populatedBooking.toObject())
        }catch(error){
            throw error
        }
    }

    async getBookingById(bookingId){
        try{
            const foundedBooking = await Booking.findById(bookingId).populate('customer').lean()
            if (!foundedBooking) return new Error(`No existe la booking id ${bookingId}`)
             return this.getMappedBooking(foundedBooking)
        }catch(error){
            throw error
        }
    }

    async getBookings(){
        try{
            const foundedBookings = await Booking.find().populate('customer').lean()
            return foundedBookings.map(item => (this.getMappedBooking(item)))
        }catch(error){
            throw error
        }
    }

    async deleteBookings(bookingsIdList){
        try{
            const result = await Booking.deleteMany({
                _id: {$in: bookingsIdList}
            })
            return result.deletedCount
        }catch(error){
            throw error
        }
    }

    async updateBookingStatus(bookingId,newStatus){
        try{
            const updateBooking = await Booking.findByIdAndUpdate(
                bookingId,
                {$set:{status:newStatus}},
                {new:true},
            ).populate('customer')
            return this.getMappedBooking(updateBooking)
        }catch(error){
            throw error
        }
    }

    getMappedBooking(booking){
       return  {
        id: booking._id,
        customer: booking.customer && {
            id: booking.customer._id.toString(),
            dni: booking.customer.dni,
            customerNumber: booking.customer.customerNumber,
            firstName: booking.customer.lastName,
            phoneNumber: booking.customer.phoneNumber,
            email: booking.customer.email
        } ,
        status: booking.status,
        sheduleInfo:{
            sheduleId: booking.sheduleId,//.toString() || null,
            slotId: booking.slotId//.toString() || null
        },
        note:booking.note 
       }

    }

}