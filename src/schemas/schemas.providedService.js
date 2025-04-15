import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'


const providedServiceSchema = z.object({
    establishmentId: validatorObject.isValidId('establishmentId'),
    status: validatorObject.isValidEnum('status',['active','inactive']),
    name: z.string(),
    description: z.string(),
    employeeId: validatorObject.isValidId('employeeId'),
    sheduleId: validatorObject.isValidId('sheduleId'),
    branchId: validatorObject.isValidId('branchId'),
    notificationsConfigId: validatorObject.isValidId('notificationsConfigId') 
})


export default providedServiceSchema;      
