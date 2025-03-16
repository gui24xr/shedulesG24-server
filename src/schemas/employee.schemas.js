import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'

export const employeeSchema = {}

const baseSchema = {
    userId: validatorObject.isValidId('userId'),
    companyId: validatorObject.isValidId('companyId'),
    firstName: validatorObject.isValidName('firstName'),
    lastName: validatorObject.isValidName('lastName'),
    specialty: z.string(),
    phoneNumber: validatorObject.isValidPhone('phoneNumber'),
    email: validatorObject.isValidEmail('email'),
}


employeeSchema.createSchema = z.object({
    userId: baseSchema.userId.optional(),
    companyId: baseSchema.companyId,
    firstName: baseSchema.firstName,
    lastName: baseSchema.lastName,
    specialty: baseSchema.specialty,
    phoneNumber: baseSchema.phoneNumber,
    email: baseSchema.email,
}).strict()



employeeSchema.querySchema = z.object({
    userId: baseSchema.userId.optional(),
    companyId: baseSchema.companyId.optional(),
    firstName: baseSchema.firstName.optional(),
    lastName: baseSchema.lastName.optional(),
    specialty: baseSchema.specialty.optional(),
}).strict()


employeeSchema.updateSchema = z.object({
    userId: baseSchema.userId.optional(),
    companyId: baseSchema.companyId.optional(),
    firstName: baseSchema.firstName.optional(),
    lastName: baseSchema.lastName.optional(),
    specialty: baseSchema.specialty.optional(),
    phoneNumber: baseSchema.phoneNumber.optional(),
    email: baseSchema.email.optional(),
}).strict()

