import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'


const ownerSchema = z.object({
    authProvider: validatorObject.isValidEnum('authProvider',['local','auth0']),
    email: validatorObject.isValidEmail('email'),
    status: validatorObject.isValidEnum('status',["active", "inactive","pendingData"]),
    firstName: validatorObject.isValidName('firstName'),
    lastName: validatorObject.isValidName('lastName'),
    phoneNumber: validatorObject.isValidPhone('phone'),
    profilePicture: validatorObject.isValidImageURL('profilePicture'),
    enabled: validatorObject.isValidBoolean('enabled'),
    lastLogin: validatorObject.isValidDateTime('lastLogin'),
})

export default ownerSchema;
