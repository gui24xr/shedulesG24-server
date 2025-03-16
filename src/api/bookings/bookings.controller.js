
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
    
