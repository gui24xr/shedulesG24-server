import {z} from 'zod'
import { validatorObject } from '../../common/commonSchemas.js'

export const bookingSchema = {}

const baseSchema = {
    customerId: validatorObject.isValidId('customerId'),
    status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
    sheduleId:validatorObject.isValidId('sheduleId'),
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
}).strict().refine((data) => {
    // Si quieres un control más fino, puedes inspeccionar las claves aquí
    const allowedKeys = ['customerId', 'status', 'sheduleId'];
    const invalidKeys = Object.keys(data).filter(key => !allowedKeys.includes(key));

    if (invalidKeys.length > 0) {
        throw new Error(`Unrecognized key(s): ${invalidKeys.join(', ')}`);
    }

    return true;
}, {
    message: "Too many fields in the query."  // Mensaje personalizado
});

bookingSchema.updateStatusSchema = z.object({
    status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
}).strict()

bookingSchema.updateNoteSchema = z.object({
    note: baseSchema.note
}).strict()