import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'

export const ownerSchema = {}

const baseSchema = {
    authProvider: validatorObject.isValidEnum('authProvider',['local','auth0']),
    email: validatorObject.isValidEmail('email'),
    status: validatorObject.isValidEnum('status',["active", "inactive","pendingData"]),
    firstName: validatorObject.isValidName('firstName'),
    lastName: validatorObject.isValidName('lastName'),
    phoneNumber: validatorObject.isValidPhone('phone'),
    profilePicture: validatorObject.isValidImageURL('profilePicture'),
    enabled: validatorObject.isValidBoolean('enabled'),
    lastLogin: validatorObject.isValidDateTime('lastLogin'),
}

const baseOwnerSchema = z.object({
    authProvider: baseSchema.authProvider,
    email: baseSchema.email,
    status: baseSchema.status,
    firstName: baseSchema.firstName,
    lastName: baseSchema.lastName,
    phoneNumber: baseSchema.phoneNumber,
    profilePicture: baseSchema.profilePicture.optional(),
    enabled: baseSchema.enabled.optional(),
    lastLogin: baseSchema.lastLogin.optional(),
})


                            

ownerSchema.createSchema = z.object({
    email: baseSchema.email,
    status: baseSchema.status.optional(),
    firstName: baseSchema.firstName.optional(),
    lastName: baseSchema.lastName.optional(),
    phoneNumber: baseSchema.phoneNumber.optional(),
    profilePicture: baseSchema.profilePicture.optional(),
    enabled: baseSchema.enabled.optional(),
    lastLogin: baseSchema.lastLogin.optional(),
}).strict()



ownerSchema.querySchema = z.object({
    email: baseSchema.email.optional(),
    status: baseSchema.status.optional(),
    firstName: baseSchema.firstName.optional(),
    lastName: baseSchema.lastName.optional(),
    phoneNumber: baseSchema.phoneNumber.optional(),
    profilePicture: baseSchema.profilePicture.optional(),
    enabled: baseSchema.enabled.optional(),
    lastLogin: baseSchema.lastLogin.optional(),
}).strict()


ownerSchema.updateSchema = z.object({
    status: baseSchema.status.optional(),
    firstName: baseSchema.firstName.optional(),
    lastName: baseSchema.lastName.optional(),
    phoneNumber: baseSchema.phoneNumber.optional(),
    profilePicture: baseSchema.profilePicture.optional(),
    enabled: baseSchema.enabled.optional(),
    lastLogin: baseSchema.lastLogin.optional(),
}).strict()

export default baseOwnerSchema;
