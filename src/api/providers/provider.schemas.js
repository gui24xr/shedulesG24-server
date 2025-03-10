import {z} from 'zod'
import { validatorObject } from '../../common/commonSchemas.js'

export const providerSchema = {}

const baseSchema = {
    companyId: validatorObject.isValidId('companyId'),
    firstName: validatorObject.isValidName('firstName'),
    lastName: validatorObject.isValidName('lastName'),
    specialty: z.string(),
    phoneNumber: validatorObject.isValidPhone('phoneNumber'),
    email: validatorObject.isValidEmail('email'),
    providedServices: validatorObject.isArrayOfValidIdOrEmptyArray('providedServices')
}


providerSchema.createSchema = z.object({
    companyId: baseSchema.companyId,
    firstName: baseSchema.firstName,
    lastName: baseSchema.lastName,
    specialty: baseSchema.specialty,
    phoneNumber: baseSchema.phoneNumber,
    email: baseSchema.email,
    providersServices: baseSchema.providedServices.optional()
}).strict()



providerSchema.querySchema = z.object({
    companyId: baseSchema.companyId.optional(),
    firstName: baseSchema.firstName.optional(),
    lastName: baseSchema.lastName.optional(),
    specialty: baseSchema.specialty.optional(),
    providersServices: baseSchema.providedServices.optional()
}).strict()


providerSchema.updateSchema = z.object({
    companyId: baseSchema.companyId.optional(),
    firstName: baseSchema.firstName.optional(),
    lastName: baseSchema.lastName.optional(),
    specialty: baseSchema.specialty.optional(),
    phoneNumber: baseSchema.phoneNumber.optional(),
    email: baseSchema.email.optional(),
    providersServices: baseSchema.providedServices.optional()
}).strict()

