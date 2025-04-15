import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'

const notificationsConfigSchema = z.object({
    establishmentId: validatorObject.isValidId('establishmentId'),
    whatsAppPhoneNumber: validatorObject.isValidPhone('whatsAppPhoneNumber'),
    smsPhoneNumber: validatorObject.isValidPhone('whatsAppPhoneNumber'),
    email:validatorObject.isValidEmail('email'),
    isEnabled: validatorObject.isValidBoolean('isEnabled'),
    isAutomatic: validatorObject.isValidBoolean('isAutomatic')
})


export default notificationsConfigSchema;
