import {z} from 'zod'
import { validatorObject } from '../../common/commonSchemas.js'

export const shedulesSchema = {}

const baseSchema = {
    providedServiceId: validatorObject.isValidId('offeringId'),
    companyId: validatorObject.isValidId('companyId'),
}


shedulesSchema.createSchema = z.object({
    providedServiceId: baseSchema.providedServiceId,
    companyId: baseSchema.companyId,
}).strict()



shedulesSchema.querySchema = z.object({
    providedServiceId: baseSchema.providedServiceId.optional(),
    companyId: baseSchema.companyId.optional(),
}).strict()


shedulesSchema.updateSchema = z.object({
    companyId: baseSchema.companyId,
}).strict()


