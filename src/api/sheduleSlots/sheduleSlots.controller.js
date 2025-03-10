import { RequestControllers } from "../../common/requestController.js";
import { sheduleSlotSchema } from "./sheduleSlots.schemas.js";
import { sheduleSlotsRepository } from "./sheduleSlots.repository.js";




class SheduleSlotsControllers extends RequestControllers{
    constructor({ repository, validateSchema,  }) {
        super({ repository, validateSchema })
    }
}


export const sheduleSlotsControllers = new SheduleSlotsControllers({
    repository: sheduleSlotsRepository,
    validateSchema: sheduleSlotSchema
})
    
