import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'

export const ownerSchema = {}

const baseSchema = {
    email: validatorObject.isValidEmail('email'),
    companyId: validatorObject.isValidId('companyId'),
    userId: validatorObject.isValidId('userId'),
    status: validatorObject.isValidEnum('status',["active", "inactive",]),
    firstName: validatorObject.isValidName('firstName'),
    lastName: validatorObject.isValidName('lastName'),
    phoneNumber: validatorObject.isValidPhone('phone')
}


ownerSchema.createSchema = z.object({
    email: baseSchema.email,
    companyId: baseSchema.companyId,
    userId: baseSchema.userId.optional(),
    status: baseSchema.status.optional(),
    firstName: baseSchema.firstName.optional(),
    lastName: baseSchema.lastName.optional(),
    phoneNumber: baseSchema.phoneNumber.optional(),
}).strict()



ownerSchema.querySchema = z.object({
    email: baseSchema.email.optional(),
    companyId: baseSchema.companyId.optional(),
    userId: baseSchema.userId.optional(),
    status: baseSchema.status.optional(),
    firstName: baseSchema.firstName.optional(),
    lastName: baseSchema.lastName.optional(),
    phoneNumber: baseSchema.phoneNumber.optional(),
}).strict()


ownerSchema.updateSchema = z.object({
    status: baseSchema.status.optional(),
    firstName: baseSchema.firstName.optional(),
    lastName: baseSchema.lastName.optional(),
    phoneNumber: baseSchema.phoneNumber.optional(),
}).strict()

