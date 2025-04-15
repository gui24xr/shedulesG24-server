import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'



const waitingListSchema = z.object({
    sheduleId: validatorObject.isValidId('sheduleId'),
    possibleDates: validatorObject.isArrayOfValidDateTimeOrEmptyArray('possibleDates'),
    status: validatorObject.isValidEnum('status',["pending", "completed", "cancelled"])
})




export default  waitingListSchema;