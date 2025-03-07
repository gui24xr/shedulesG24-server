import {optional, z} from 'zod'
import { validatorObject } from '../../schemas/commonSchemas.js'

export const offeringSchema = {}

const baseSchema = {
    companyId:validatorObject.isValidId('companyId'),
    name: z.string(),
    description:z.string(),
    agentFirstName:validatorObject.isValidName('agentFirstName'),
    agentLastName:validatorObject.isValidName('agentLasttName'),
    sheduleId:validatorObject.isValidId('sheduleId'),
    companyBranchId: validatorObject.isValidId('companyBranchId'),
    notificationsConfigId: validatorObject.isValidId('notificationsConfigId'),

}


offeringSchema.createSchema = z.object({
    companyId: baseSchema.companyId,
    name: baseSchema.name,
    description:baseSchema.description,
    agentFirstName:baseSchema.agentFirstName.optional(),
    agentLastName:baseSchema.agentLastName.optional(),
    sheduleId:baseSchema.sheduleId.optional(),
    companyBranchId: baseSchema.companyBranchId.optional(),
    notificationsConfigId: baseSchema.notificationsConfigId.optional(),
}).strict()



offeringSchema.querySchema = z.object({
    name: baseSchema.name,
    companyId: baseSchema.companyId.optional(),
    companyBranchId: baseSchema.companyBranchId.optional(),
}).strict()

offeringSchema.updateSchema = z.object({
    name: baseSchema.name,
    description:baseSchema.description,
    agentFirstName:baseSchema.agentFirstName.optional(),
    agentLastName:baseSchema.agentLastName.optional(),
    sheduleId:baseSchema.sheduleId.optional(),
    companyBranchId: baseSchema.companyBranchId.optional(),
    notificationsConfigId: baseSchema.notificationsConfigId.optional(),
})

