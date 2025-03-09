import {z} from 'zod'
import { validatorObject } from '../../common/commonSchemas.js'

export const shedulesSchema = {}

const baseSchema = {
    offeringId: validatorObject.isValidId('offeringId'),
    companyId: validatorObject.isValidId('companyId'),
    slots: validatorObject.isArrayOfValidIdOrEmptyArray('slots'),
    additionalsSlots: validatorObject.isArrayOfValidIdOrEmptyArray('additionalSlots'),
    waitingListId: validatorObject.isValidId('waitingListId'),
}


shedulesSchema.createSchema = z.object({
    offeringId: baseSchema.offeringId,
    companyId: baseSchema.companyId,
    slots: baseSchema.slots.optional(),
    additionalsSlots: baseSchema.additionalsSlots.optional(),
    waitingListId: baseSchema.waitingListId.optional()
}).strict()



shedulesSchema.querySchema = z.object({
  
}).strict()


shedulesSchema.updateSchema = z.object({
    companyId: baseSchema.companyId,
    slots: baseSchema.slots.optional(),
    additionalSlots: baseSchema.additionalsSlots.optional(),
    waitingListId: baseSchema.waitingListId.optional()
}).strict()


