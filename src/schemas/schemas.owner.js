import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'


const ownerSchema = z.object({
    authProvider: validatorObject.isValidEnum('authProvider',['local','auth0']),
    email: validatorObject.isValidEmail('email'),
    status: validatorObject.isValidEnum('status',["active", "inactive"]),
    lastLogin: validatorObject.isValidDateTime('lastLogin'),
})

export default ownerSchema;
