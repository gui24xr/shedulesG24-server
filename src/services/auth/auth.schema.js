import { z} from 'zod'
import { validatorObject } from '../../common/commonSchemas.js'

export const authSchema = {}

const baseSchema = {
    email: validatorObject.isValidEmail('email'),
    userName: validatorObject.isValidUserName('userName'),
    password: validatorObject.isValidPassword('password'),
    devPasswordKey: validatorObject.isValidDevPasswordSecretKey('devPasswordKey'),
    profilePicture: validatorObject.isValidImageURL('profilePicture')
}
    


authSchema.createDevSchema = z.object({
    email: baseSchema.email,
    userName: baseSchema.userName,
    password: baseSchema.password,
    devPasswordKey: baseSchema.devPasswordKey,
}).strict()


authSchema.loginDevSchema = z.object({
    email: baseSchema.email,
    password: baseSchema.password
}).strict()


authSchema.createAuth0UserSchema = z.object({
    email: baseSchema.email,
    userName: baseSchema.userName,
    
}).strict()

/*
authSchema.querySchema = z.object({
    email: baseSchema.email.optional(),
    role: baseSchema.role.optional(),
    userName: baseSchema.userName.optional(),
    lastLogin: baseSchema.lastLogin.optional(), 
    companies:baseSchema.companies.optional()
}).strict()
*/

authSchema.updateDevSchema = z.object({
    email: baseSchema.email.optional(),
    userName: baseSchema.userName.optional(),
   
    password: baseSchema.password.optional(),
    devPasswordKey: baseSchema.devPasswordKey
}).strict()

