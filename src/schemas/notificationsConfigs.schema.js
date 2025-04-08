import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'

const baseSchema = {
    companyId: validatorObject.isValidId('companyId'),
    whatsAppPhoneNumber: validatorObject.isValidPhone('whatsAppPhoneNumber'),
    smsPhoneNumber: validatorObject.isValidPhone('whatsAppPhoneNumber'),
    email:validatorObject.isValidEmail('email'),
    isEnabled: validatorObject.isValidBoolean('isEnabled'),
    isAutomatic: validatorObject.isValidBoolean('isAutomatic')
}

const baseNotificationsConfigSchema = z.object({
    companyId: baseSchema.companyId,
    whatsAppPhoneNumber: baseSchema.whatsAppPhoneNumber,
    smsPhoneNumber: baseSchema.smsPhoneNumber,
    email: baseSchema.email,    
})

export const notificationsConfigSchema = {}

notificationsConfigSchema.createSchema = z.object({
    companyId: baseSchema.companyId
}).strict()

notificationsConfigSchema.querySchema = z.object({
    companyId: baseSchema.companyId.optional()
}).strict()

notificationsConfigSchema.updateWhatsAppConfigSchema= z.object({
    phoneNumber: baseSchema.whatsAppPhoneNumber.optional(),
    isEnabled: baseSchema.isEnabled.optional(),
    isAutomatic: baseSchema.isAutomatic.optional()
}).strict()

notificationsConfigSchema.updateSMSConfigSchema= z.object({
    phoneNumber: baseSchema.whatsAppPhoneNumber.optional(),
    isEnabled: baseSchema.isEnabled.optional(),
    isAutomatic: baseSchema.isAutomatic.optional()
}).strict()

notificationsConfigSchema.updateEmailConfigSchema= z.object({
    email: baseSchema.email.optional(),
    isEnabled: baseSchema.isEnabled.optional(),
    isAutomatic: baseSchema.isAutomatic.optional()
}).strict()

export default baseNotificationsConfigSchema;
