import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'


const tenantsAppsUserSchema = z.object({
    authProvider: validatorObject.isValidEnum('authProvider',['local','auth0']),
    email: validatorObject.isValidEmail('email'),
    establishmentId: validatorObject.isValidId('establishmentId'),
    role:validatorObject.isValidEnum('role',["dev", "owner", "admin", "customer", "employee" ]),
    userName: validatorObject.isValidUserName('userName'),
    password: validatorObject.isValidPassword('password'),
    enabled: validatorObject.isValidBoolean('enabled'),
    lastLogin: validatorObject.isValidDateTime('lastLogin'),
})




export default tenantsAppsUserSchema;