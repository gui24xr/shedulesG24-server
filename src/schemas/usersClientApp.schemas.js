import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'

export const usersClientAppSchema = {}

const baseUserSchema = z.object({
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


const baseSchema = {
    authProvider: validatorObject.isValidEnum('authProvider',['local','auth0']),
    email: validatorObject.isValidEmail('email'),
    companyId: validatorObject.isValidId('companyId'),
    role:validatorObject.isValidEnum('role',["dev", "owner", "admin", "customer", "employee" ]),
    userName: validatorObject.isValidUserName('userName'),
    password: validatorObject.isValidPassword('password'),
    profilePicture: validatorObject.isValidImageURL('profilePicture'),
    enabled: validatorObject.isValidBoolean('enabled'),
    lastLogin: validatorObject.isValidDateTime('lastLogin'),
}
    

usersClientAppSchema.createSchema = z.object({
    authProvider: baseSchema.authProvider.optional(),
    email: baseSchema.email.optional(),
    companyId: baseSchema.companyId.optional(),
    role: baseSchema.role.optional(),
    userName: baseSchema.userName,
    password: baseSchema.password.optional(),
    profilePicture: baseSchema.profilePicture.optional(),
    enabled: baseSchema.enabled.optional(),
    lastLogin: baseSchema.lastLogin.optional(), 
}).strict()



usersClientAppSchema.querySchema = z.object({
    email: baseSchema.email.optional(),
    companyId: baseSchema.companyId.optional(),
    role: baseSchema.role.optional(),
    enabled: baseSchema.enabled.optional(),
    userName: baseSchema.userName.optional(),
    lastLogin: baseSchema.lastLogin.optional(), 
}).strict()


usersClientAppSchema.updateSchema = z.object({
    email: baseSchema.email.optional(),
    role: baseSchema.role.optional(),
    password: baseSchema.password.optional(),
    profilePicture: baseSchema.profilePicture.optional(),
    enabled: baseSchema.enabled.optional(),
    lastLogin: baseSchema.lastLogin.optional(), 
}).strict()


export default baseUserSchema;