import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'

const bookingSchema = z.object({
    customerId: validatorObject.isValidId('customerId'),
    status: validatorObject.isValidEnum('status',["pending", "confirmed", "completed", "cancelled"]),
    sheduleId: validatorObject.isValidId('sheduleId'),
    slotId: validatorObject.isValidId('slotId'),
    note: validatorObject.isValidDescription('note'),
})


export default bookingSchema;