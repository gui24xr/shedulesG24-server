import {z} from 'zod'
import { validatorObject } from '../../common/commonSchemas.js'
import providedService from '../../models/models.providedService.js'

export const companySchema = {}

const baseSchema = {
    userId: validatorObject.isValidId('userId'),
    name: validatorObject.isValidCompanyName('name'),
    description: validatorObject.isValidDescription('description'),
    logoUrl: validatorObject.isValidImageURL('logoURL'),
    phoneNumber: validatorObject.isValidPhone('phoneNumber'),
    email: validatorObject.isValidEmail('email'),
    location: validatorObject.isValidLocation('location'),
    providedServices: validatorObject.isArrayOfValidIdOrEmptyArray('providedServices'),
    branchs: validatorObject.isArrayOfValidIdOrEmptyArray('branchs'),
    customerCounter: z.number().int().min(0),
    customers: validatorObject.isArrayOfValidIdOrEmptyArray('customers'),
}



companySchema.createSchema = z.object({
    userId: baseSchema.userId,
    name: baseSchema.name,
    description: baseSchema.description,
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
    location: baseSchema.location.optional(),
    providedService: baseSchema.providedServices.optional(),
    branchs: baseSchema.branchs.optional(),
    customerCounter: baseSchema.customerCounter.optional(),
    customers: baseSchema.customers.optional() 
}).strict()

