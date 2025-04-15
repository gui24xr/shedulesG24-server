import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'



const pendingEmployeeUserSchema = z.object({
    establishmentId: validatorObject.isValidId('establishmentId'),
    employeeRecord: validatorObject.isValidRecord('employeeRecord'),
    activationCode: validatorObject.isValidActivationCode('activationCode'),
    role: validatorObject.isValidEnum('role',[ "admin","employee" ]),
    expirationDate: validatorObject.isValidDateTime('expirationDate'),
    status: validatorObject.isValidEnum('status',["pending", "completed",]),
})


export default pendingEmployeeUserSchema;

