import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'


export const companySchema = {}


const baseCompanySchema = z.object({
    companyCode: validatorObject.isValidCompanyCode('companyCode'),
    name: validatorObject.isValidCompanyName('name'),
    description: validatorObject.isValidDescription('description'),
    logoUrl: validatorObject.isValidImageURL('logoURL'),
    phoneNumber: validatorObject.isValidPhone('phoneNumber'),
    email: validatorObject.isValidEmail('email'),
    location: validatorObject.isValidLocation('location'),
    customersCounter: z.number().int().min(0),
    employeesCounter: z.number().int().min(0),
})
 
const baseSchema = {
    companyCode: validatorObject.isValidCompanyCode('companyCode'),
    name: validatorObject.isValidCompanyName('name'),
    description: validatorObject.isValidDescription('description'),
    logoUrl: validatorObject.isValidImageURL('logoURL'),
    phoneNumber: validatorObject.isValidPhone('phoneNumber'),
    email: validatorObject.isValidEmail('email'),
    location: validatorObject.isValidLocation('location'),
    customersCounter: z.number().int().min(0),
    employeesCounter: z.number().int().min(0),
}



companySchema.createSchema = z.object({
    companyCode: baseSchema.companyCode,
    name: baseSchema.name,
    description: baseSchema.description,
    logoUrl: baseSchema.logoUrl.optional(),
    phoneNumber:baseSchema.phoneNumber.optional(),
    email: baseSchema.email,
    location: baseSchema.location.optional()
}).strict()



companySchema.querySchema = z.object({
    companyCode: baseSchema.companyCode.optional(),
    name: baseSchema.name.optional(),
    email: baseSchema.email.optional(),
    location: baseSchema.location.optional()
}).strict()


companySchema.updateSchema = z.object({
    companyCode: baseSchema.companyCode.optional(),
    name: baseSchema.name.optional(),
    logoUrl: baseSchema.logoUrl.optional(),
    phoneNumber:baseSchema.phoneNumber.optional(),
    email: baseSchema.email,
    location: baseSchema.location.optional(),
    customerCounter: baseSchema.customersCounter.optional(),
    employeesCounter: baseSchema.employeesCounter.optional(),
}).strict()

//---------------------------------------------------

export default baseCompanySchema;
