import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'




const employeeSchema = z.object({
    establishmentId: validatorObject.isValidId('establishmentId'),
    employeeRecord: validatorObject.isValidRecord('employeeRecord'),
    type: validatorObject.isValidEnum('type',['admin','operative']),
    status: validatorObject.isValidEnum('status',['active','inactive']),
    specialty: validatorObject.isValidName('specialty'),
    profileId: validatorObject.isValidId('profileId'),
    workData: z.object({
        phone: validatorObject.isValidPhone('phone'),
        email: validatorObject.isValidEmail('email'),
        displayName: validatorObject.isValidName('displayName'),
    }),
    tenantsAppsUserId: validatorObject.isValidId('tenantsAppsUserId'),
})


export default employeeSchema;