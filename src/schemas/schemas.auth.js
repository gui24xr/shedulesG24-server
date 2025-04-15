import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'


 const authSchema = z.object({
    authProvider: validatorObject.isValidEnum('authProvider',['local','auth0']),
    email: validatorObject.isValidEmail('email'),
    companyId: validatorObject.isValidId('companyId'),
    role:validatorObject.isValidEnum('role',["dev", "owner", "admin", "customer", "employee" ]),
    userName: validatorObject.isValidUserName('userName'),
    password: validatorObject.isValidPassword('password'),
    profilePicture: validatorObject.isValidImageURL('profilePicture'),
    enabled: validatorObject.isValidBoolean('enabled'),
    lastLogin: validatorObject.isValidDateTime('lastLogin'),
})

export default authSchema;