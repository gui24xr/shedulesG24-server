import {z} from 'zod'
import { validatorObject } from '../../schemas/commonSchemas.js'

export const companySchema = {}

const baseSchema = {
    userId: validatorObject.isValidId('userId'),
    name: z.string(),
    logoUrl: validatorObject.isValidImageURL('logoURL'),
    phoneNumber: validatorObject.isValidPhone('phoneNumber'),
    email: validatorObject.isValidEmail('email'),
    location: validatorObject.isValidLocation('location'),
}


companySchema.createSchema = z.object({
    userId: baseSchema.userId,
    name: baseSchema.name,
    logoUrl: baseSchema.logoUrl.optional(),
    phoneNumber:baseSchema.phoneNumber.optional(),
    email: baseSchema.email,
    location: baseSchema.location.optional()
}).strict()



companySchema.querySchema = z.object({
    userId: baseSchema.userId.optional(),
    name: baseSchema.name.optional(),
    email: baseSchema.email.optional(),
    location: baseSchema.location.optional()
}).strict()


companySchema.updateSchema = z.object({
    name: baseSchema.name.optional(),
    logoUrl: baseSchema.logoUrl.optional(),
    phoneNumber:baseSchema.phoneNumber.optional(),
    email: baseSchema.email,
    location: baseSchema.location.optional()
}).strict()

