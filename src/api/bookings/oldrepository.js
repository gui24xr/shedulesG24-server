
/*
export class BookingsRepository{
    async createPendingBooking({customerId,sheduleId,slotId,note}){
        try{
            const newBooking = await Booking.create({
                customer: customerId,
                sheduleInfo:{
                    sheduleId: sheduleId || null,
                    slotId: slotId || null,
                },
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
            if (!foundedBooking) throw new Error(`No existe la booking id ${bookingId}`)
            return this.getMappedBooking(foundedBooking)
        }catch(error){
            throw error
        }
    }

    async getBookings({status,customerId,sheduleId}){
        try{
            const filter = {}
            if (status) filter.status = status
            if (customerId) filter.customer = customerId
            if (sheduleId) filter["sheduleInfo.sheduleId"] = sheduleId

            const foundedBookings = await Booking.find(filter).populate('customer').lean()
            return foundedBookings.map(item => (this.getMappedBooking(item)))
        }catch(error){
            throw error
        }
    }

    async deleteBookings(idsList){
        try{
            
            const result = await Booking.deleteMany({
                _id: {$in: idsList}
            })

            if (result.deletedCount < idsList.length) throw new Error("Uno o mas registros no han sido borrados...")
            return result.deletedCount
        }catch(error){
            throw error
        }
    }

    async updateBookingStatus(bookingId,{status}){
        try{
            console.log('newStatus: ', status)
            const updateBooking = await Booking.findByIdAndUpdate(
                bookingId,
                {$set:{status:status}},
                {new:true},
            ).populate('customer')
            if (!updateBooking)  throw new Error('No existe el registro que se intenta actualizar...')
            return this.getMappedBooking(updateBooking)
        }catch(error){
            throw error
        }
    }

    async updateBookingNote(bookingId,{note}){
        try{
            const updateBooking = await Booking.findByIdAndUpdate(
                bookingId,
                {$set:{note:note}},
                {new:true},
            ).populate('customer')
            if (!updateBooking)  throw new Error('No existe el registro que se intenta actualizar...')
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
        sheduleInfo: {
            sheduleId: booking.sheduleInfo.sheduleId ? booking.sheduleInfo.sheduleId.toString() : null,
            slotId: booking.sheduleInfo.slotId ? booking.sheduleInfo.slotId.toString() : null
        },
        note:booking.note 
       }

    }

}

*/