import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'

export const pendingEmployeeUserSchema = {}

const baseSchema = {
    companyId: validatorObject.isValidId('companyId'),
    employeeRecord: validatorObject.isValidRecord('employeeRecord'),
    activationCode: validatorObject.isValidActivationCode('activationCode'),
    role: validatorObject.isValidEnum('role',[ "admin","employee" ]),
    expirationDate: validatorObject.isValidDateTime('expirationDate'),
    status: validatorObject.isValidEnum('status',["pending", "completed",]),
}

const basePendingEmployeeUserSchema = z.object({
    companyId: baseSchema.companyId,
    employeeRecord: baseSchema.employeeRecord,
    activationCode: baseSchema.activationCode,
    role: baseSchema.role,
    status: baseSchema.status.optional(),
})

pendingEmployeeUserSchema.createSchema = z.object({
    companyId: baseSchema.companyId,
    employeeRecord: baseSchema.employeeRecord,
    activationCode: baseSchema.activationCode,
    role: baseSchema.role,
    status: baseSchema.status.optional(),
}).strict()



pendingEmployeeUserSchema.querySchema = z.object({
    companyId: baseSchema.companyId.optional(),
    employeeRecord: baseSchema.employeeRecord.optional(),
    role: baseSchema.role.optional(),
    status: baseSchema.status.optional(),
}).strict()


pendingEmployeeUserSchema.updateSchema = z.object({
    role: baseSchema.role.optional(),
    status: baseSchema.status.optional(),
}).strict()

export default basePendingEmployeeUserSchema;

