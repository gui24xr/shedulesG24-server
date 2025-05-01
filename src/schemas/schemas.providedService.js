import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'


const providedServiceSchema = z.object({
    establishmentId: validatorObject.isValidId('establishmentId'),
    status: validatorObject.isValidEnum('status',['active','inactive']),
    name: z.string(),
    description: z.string(),
    employeeId: validatorObject.isValidId('employeeId'),
    sheduleId: validatorObject.isValidId('sheduleId'),
    defaultBranchId: validatorObject.isValidId('defaultBranchId'),
    notificationsConfig: z.object({
        email: z.boolean(),
        sms: z.boolean(),
        push: z.boolean(),
        whatsapp: z.boolean(),
    })
})


export default providedServiceSchema;      
