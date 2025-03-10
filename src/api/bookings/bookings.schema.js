import {z} from 'zod'
import { validatorObject } from '../../common/commonSchemas.js'

export const bookingSchema = {}

const baseSchema = {
    customerId: validatorObject.isValidId('customerId'),
    status: validatorObject.isValidEnum('status',["pending", "confirmed", "completed", "cancelled"]),
    sheduleId: validatorObject.isValidId('sheduleId'),
    slotId: validatorObject.isValidId('slotId'),
    note: z.string()
}




bookingSchema.createSchema = z.object({
    customerId: baseSchema.customerId.optional(),
    status: baseSchema.status.optional(),
    sheduleId: baseSchema.sheduleId.optional(),
    slotId:baseSchema.slotId.optional(),
    note: baseSchema.note.optional()
}).strict()



bookingSchema.querySchema = z.object({
    customerId: baseSchema.customerId.optional(),
    status: baseSchema.status.optional(),
    sheduleId: baseSchema.sheduleId.optional(),
}).strict()

bookingSchema.updateStatusSchema = z.object({
    status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
}).strict()

bookingSchema.updateNoteSchema = z.object({
    note: baseSchema.note
}).strict()