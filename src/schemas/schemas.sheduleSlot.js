import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'



const sheduleSlotSchema = z.object({
    sheduleId: validatorObject.isValidId('sheduleId'),
    type:validatorObject.isValidEnum("type",["regular", "additional", "urgent"]),
    priority: validatorObject.isValidEnum("priority",["low", "medium", "high", "veryHigh"]),
    startDateTime: validatorObject.isValidDateTime('startDateTime'),
    endDateTime: validatorObject.isValidDateTime('endDateTime'),
    durationInMinutes: validatorObject.isValidIntervalTime('durationInMinutes',1),
    currentBookingId: validatorObject.isValidId('currentBookingId'),
    canceledBookings: validatorObject.isArrayOfValidIdOrEmptyArray('canceledBookings')
})

export default sheduleSlotSchema;
