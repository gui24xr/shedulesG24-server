import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'




const employeeSchema = z.object({
    establishmentId: validatorObject.isValidId('establishmentId'),
    employeeRecord: validatorObject.isValidRecord('employeeRecord'),
    specialty: validatorObject.isValidName('specialty'),
    category: validatorObject.isValidEnum('category',['admin','operative']),
    status: validatorObject.isValidEnum('status',['active','inactive']),
    firstName: validatorObject.isValidName('firstName'),
    lastName: validatorObject.isValidName('lastName'),
    email: validatorObject.isValidEmail('email'),
    phoneNumber: validatorObject.isValidPhone('phoneNumber'),
    userClientAppId: validatorObject.isValidId('userClientAppId'),
})


export default employeeSchema;