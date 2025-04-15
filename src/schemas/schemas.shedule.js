import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'



const sheduleSchema = z.object({
    providedServiceId: validatorObject.isValidId('providedServiceId'),
})



export default sheduleSchema;