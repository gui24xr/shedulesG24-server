import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'
import businessCategories from '../constants/constants.businessCategories.js'
import schedulingConfigType from '../constants/constants.shedulingConfigType.js'
import establishmentStatus from '../constants/constants.establishmentStatus.js'

const establishmentSchema = z.object({
    establishmentCode: validatorObject.isValidCompanyCode('establishmentCode'),
    ownerId: validatorObject.isValidId('ownerId'),
    businessCategory: validatorObject.isValidEnum('businessCategory',businessCategories.map(category => category.category)),
    schedulingConfigType: validatorObject.isValidEnum('schedulingConfigType',schedulingConfigType.map(shedulingConfigType => shedulingConfigType.type)),
    status: validatorObject.isValidEnum('status',establishmentStatus.map(status => status.status)),
    hasOnlyBranch: validatorObject.isValidBoolean('hasOnlyBranch'),
    hasEmployees: validatorObject.isValidBoolean('hasEmployees'),
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
