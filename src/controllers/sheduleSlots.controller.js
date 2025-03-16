import { RequestControllers } from "../common/requestController.js";
import { sheduleSlotSchema } from "../schemas/sheduleSlots.schemas.js";
import { sheduleSlotsRepository } from "../repositories/sheduleSlots.repository.js";




class SheduleSlotsControllers extends RequestControllers{
    constructor({ repository, validateSchema,  }) {
        super({ repository, validateSchema })
    }
}


export const sheduleSlotsControllers = new SheduleSlotsControllers({
    repository: sheduleSlotsRepository,
    validateSchema: sheduleSlotSchema
})
    
