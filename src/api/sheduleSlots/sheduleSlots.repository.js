import { MongooseRepository } from '../../common/mongooseRepository.js'
import { SheduleSlot } from '../../models/index.js'
import { sheduleSlotSchema } from './sheduleSlots.schemas.js'


class SheduleSlotsRepository extends MongooseRepository{
    constructor({ model, validateSchema, populateFieldsArray }) {
        super({ model, validateSchema, populateFieldsArray })
    }
}

export const sheduleSlotsRepository = new SheduleSlotsRepository({
    model: SheduleSlot,
    validateSchema: sheduleSlotSchema,
    populateFieldsArray: []
})


