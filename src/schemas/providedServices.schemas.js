import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'

export const providedServiceSchema = {}

const baseSchema = {
    companyId: validatorObject.isValidId('companyId'),
    name: z.string(),
    description: z.string(),
    employeeId: validatorObject.isValidId('employeeId'),
    sheduleId: validatorObject.isValidId('sheduleId'),
    companyBranchId: validatorObject.isValidId('companybranchId'),
    notificationsConfigId: validatorObject.isValidId('notificationsConfigId') 
}

const baseProvidedServiceSchema = z.object({
    companyId: baseSchema.companyId,
    name: baseSchema.name,
    description: baseSchema.description,
    employeeId: baseSchema.employeeId,
    sheduleId: baseSchema.sheduleId,
    companyBranchId: baseSchema.companyBranchId,
    notificationsConfigId: baseSchema.notificationsConfigId
})

providedServiceSchema.createSchema = z.object({
    companyId: baseSchema.companyId,
    name: baseSchema.name,
    description: baseSchema.description,
    employeeId: baseSchema.employeeId,
    sheduleId: baseSchema.sheduleId,
    companyBranchId: baseSchema.companyBranchId,
    notificationsConfigId: baseSchema.notificationsConfigId.optional()
}).strict()



providedServiceSchema.querySchema = z.object({
    companyId: baseSchema.companyId.optional(),
    name: baseSchema.name.optional(),
    description: baseSchema.description.optional(),
    companyBranchId: baseSchema.companyBranchId.optional(),
}).strict()


providedServiceSchema.updateSchema = z.object({
    name: baseSchema.name.optional(),
    description: baseSchema.description.optional(),
    companyBranchId: baseSchema.companyBranchId.optional(),
    employeeId: baseSchema.employeeId.optional(),
}).strict()

export default baseProvidedServiceSchema;
