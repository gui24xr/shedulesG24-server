import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'


const establishmentSchema = z.object({
    establishmentCode: validatorObject.isValidCompanyCode('establishmentCode'),
    ownerId: validatorObject.isValidId('ownerId'),
    category: z.number().int().min(0),
    status: validatorObject.isValidEnum('status',['active','inactive','pendingData']),
    hasOnlyBranch: validatorObject.isValidBoolean('hasOnlyBranch'),
    name: validatorObject.isValidStablishmentName('name'),
    description: validatorObject.isValidDescription('description'),
    logoUrl: validatorObject.isValidImageURL('logoURL'),
    phoneNumber: validatorObject.isValidPhone('phoneNumber'),
    email: validatorObject.isValidEmail('email'),
    location: validatorObject.isValidLocation('location'),
    customersCounter: z.number().int().min(0),
    employeesCounter: z.number().int().min(0),
})
 
export default establishmentSchema
