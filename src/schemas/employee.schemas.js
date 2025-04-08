import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'

export const employeeSchema = {}

const baseSchema = {
    companyId: validatorObject.isValidId('companyId'),
    employeeRecord: validatorObject.isValidRecord('employeeRecord'),
    specialty: validatorObject.isValidName('specialty'),
    category: validatorObject.isValidEnum('category',["admin", "operative",]),
    status: validatorObject.isValidEnum('status',["active", "inactive",]),
    firstName: validatorObject.isValidName('firstName'),
    lastName: validatorObject.isValidName('lastName'),
    phoneNumber: validatorObject.isValidPhone('phoneNumber'),
    email: validatorObject.isValidEmail('email'),
    userId: validatorObject.isValidId('userId'),
}

const baseEmployeeSchema = z.object({
    companyId: baseSchema.companyId,
    employeeRecord: baseSchema.employeeRecord,
    specialty: baseSchema.specialty,
    category: baseSchema.category,
    status: baseSchema.status,
    firstName: baseSchema.firstName,
    lastName: baseSchema.lastName,
    phoneNumber: baseSchema.phoneNumber,
    email: baseSchema.email,
    userId: baseSchema.userId,
})


employeeSchema.createSchema = z.object({
    companyId: baseSchema.companyId,
    employeeRecord: baseSchema.employeeRecord,
    specialty: baseSchema.specialty,
    category: baseSchema.category,
    status: baseSchema.status,
    firstName: baseSchema.firstName,
    lastName: baseSchema.lastName,
    phoneNumber: baseSchema.phoneNumber.optional(),
    email: baseSchema.email.optional(),
    userId: baseSchema.userId.optional(),
}).strict()



employeeSchema.querySchema = z.object({
    companyId: baseSchema.companyId.optional(),
    employeeRecord: baseSchema.employeeRecord.optional(),
    specialty: baseSchema.specialty.optional(),
    category: baseSchema.category.optional(),
    status: baseSchema.status.optional(),
    firstName: baseSchema.firstName.optional(),
    lastName: baseSchema.lastName.optional(),
    phoneNumber: baseSchema.phoneNumber.optional(),
    email: baseSchema.email.optional(),
    userId: baseSchema.userId.optional(),
}).strict()


employeeSchema.updateSchema = z.object({
    companyId: baseSchema.companyId.optional(),
    employeeRecord: baseSchema.employeeRecord.optional(),
    specialty: baseSchema.specialty.optional(),
    category: baseSchema.category.optional(),
    status: baseSchema.status.optional(),
    firstName: baseSchema.firstName.optional(),
    lastName: baseSchema.lastName.optional(),
    phoneNumber: baseSchema.phoneNumber.optional(),
    email: baseSchema.email.optional(),
}).strict()

export default baseEmployeeSchema;