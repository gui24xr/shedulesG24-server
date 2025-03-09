import { MongooseRepository } from "../../common/mongooseRepository.js";
import Booking from "../../models/models.booking.js";
import { bookingSchema } from "./bookings.schema.js";



class BookingsRepository extends MongooseRepository{
    constructor({ model, validateSchema, populateFieldsArray }) {
        super({ model, validateSchema, populateFieldsArray })
    }
}

export const bookingsRepository = new BookingsRepository({
    model: Booking,
    validateSchema: bookingSchema,
    populateFieldsArray: []
})

