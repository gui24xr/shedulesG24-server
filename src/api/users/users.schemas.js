import {optional, z} from 'zod'
import { validatorObject } from '../../common/commonSchemas.js'

export const userSchema = {}

const baseSchema = {
    email: validatorObject.isValidEmail('email'),
    role:validatorObject.isValidEnum('role',["dev", "provider", "customer", "company","admin"]),
    userName: validatorObject.isValidUserName('userName'),
    firstName: validatorObject.isValidName('firstName'),
    lastName: validatorObject.isValidName('lastName'),
    password: validatorObject.isValidPassword('password'),
    profilePicture: validatorObject.isValidImageURL('profilePicture'),
    enabled: validatorObject.isValidBoolean('enabled'),
    lastLogin: validatorObject.isValidDateTime('lastLogin'),
    companies: validatorObject.isArrayOfValidIdOrEmptyArray('companies')
}
    


userSchema.createSchema = z.object({
    email: baseSchema.email,
    role: baseSchema.role,
    userName: baseSchema.userName,
    firstName: baseSchema.firstName,
    lastName: baseSchema.lastName,
    password: baseSchema.password.optional(),
    profilePicture: baseSchema.profilePicture.optional(),
    enabled: baseSchema.enabled.optional(),
    lastLogin: baseSchema.lastLogin.optional(), 
    companies:baseSchema.companies.optional()
}).strict()



userSchema.querySchema = z.object({
    email: baseSchema.email.optional(),
    role: baseSchema.role.optional(),
    userName: baseSchema.userName.optional(),
    lastLogin: baseSchema.lastLogin.optional(), 
    companies:baseSchema.companies.optional()
}).strict()


userSchema.updateSchema = z.object({
    role: baseSchema.role.optional(),
    firstName: baseSchema.firstName.optional(),
    lastName: baseSchema.lastName.optional(),
    password: baseSchema.password.optional(),
    profilePicture: baseSchema.profilePicture.optional(),
    enabled: baseSchema.enabled.optional(),
    lastLogin: baseSchema.lastLogin.optional(), 
    companies:baseSchema.companies.optional()
}).strict()

