import {z} from 'zod'
import { validatorObject } from '../../common/commonSchemas.js'

export const sheduleSlotSchema = {}

const baseSchema = {
    sheduleId: validatorObject.isValidId('sheduleId'),
    startDateTime: validatorObject.isValidDateTime('startDateTime'),
    endDateTime: validatorObject.isValidDateTime('endDateTime'),
    durationInMinutes: validatorObject.isValidIntervalTime('durationInMinutes',1),
    currentBookingId: validatorObject.isValidId('currentBookingId'),
    canceledBookings: validatorObject.isArrayOfValidIdOrEmptyArray('canceledBookings')
}


sheduleSlotSchema.createSchema = z.object({
    sheduleId: baseSchema.sheduleId,
    startDateTime: baseSchema.startDateTime,
    endDateTime: baseSchema.endDateTime,
    durationInMinutes: baseSchema.durationInMinutes,
    currentBookingId: baseSchema.currentBookingId.optional(),
    canceledBookings: baseSchema.canceledBookings.optional()
}).strict()



sheduleSlotSchema.querySchema = z.object({
    sheduleId: baseSchema.sheduleId.optional(),
    startDateTime: baseSchema.startDateTime.optional(),
    endDateTime: baseSchema.endDateTime.optional(),
    durationInMinutes: baseSchema.durationInMinutes.optional(),
    currentBookingId: baseSchema.currentBookingId.optional(),
}).strict()


sheduleSlotSchema.updateSchema = z.object({
    sheduleId: baseSchema.sheduleId.optional(),
    startDateTime: baseSchema.startDateTime.optional(),
    endDateTime: baseSchema.endDateTime.optional(),
    durationInMinutes: baseSchema.durationInMinutes.optional(),
    currentBooking: baseSchema.currentBookingId.optional(),
}).strict()

