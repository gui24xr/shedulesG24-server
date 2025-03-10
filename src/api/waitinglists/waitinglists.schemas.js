import {z} from 'zod'
import { validatorObject } from '../../common/commonSchemas.js'

export const waitingListSchema = {}

const itemObject = z.object({
    customerId: validatorObject.isValidId('customerId'),
    possibleDates: validatorObject.isArrayOfValidDateTimeOrEmptyArray('possibleDates'),
    status: validatorObject.isValidEnum('status',["pending", "completed", "cancelled"])
})


const baseSchema = {
    sheduleId: validatorObject.isValidId('sheduleId'),
    items: validatorObject.isArrayOfValidObjects('items', itemObject)
}


waitingListSchema.createSchema = z.object({
    sheduleId: baseSchema.sheduleId,
    items: baseSchema.items.optional(),
}).strict()



waitingListSchema.querySchema = z.object({
    sheduleId: baseSchema.sheduleId.optional(),
}).strict()


waitingListSchema.updateSchema = z.object({
    sheduleId: baseSchema.sheduleId.optional(),
    items: baseSchema.items.optional(),
}).strict()


