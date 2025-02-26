import {z} from 'zod'

const objectIdRegex = /^[a-fA-F0-9]{24}$/;

export const bookingSchemma = z.object({
    id: z.string().regex(objectIdRegex, "Invalid ObjectId").optional(),
    customerId: z.string().regex(objectIdRegex, "Invalid ObjectId").optional(),
    status: z.enum(["pending", "confirmed", "completed", "cancelled"]).optional(),
    SheduleId:  z.string().regex(objectIdRegex, "Invalid ObjectId").optional(),
    slotId:  z.string().regex(objectIdRegex, "Invalid ObjectId").optional(),
    note: z.string().optional()
})


