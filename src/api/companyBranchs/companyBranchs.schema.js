import {z} from 'zod'
import { validatorObject } from '../../common/commonSchemas.js'

export const companyBranchSchema = {}

const baseSchema = {
    companyId: validatorObject.isValidId('companyId'),
    name: z.string(),
    location: validatorObject.isValidLocation('location')
}


companyBranchSchema.createSchema = z.object({
  name: baseSchema.name,
  companyId: baseSchema.companyId,
  location: baseSchema.location 
}).strict()

companyBranchSchema.querySchema = z.object({
  name: baseSchema.name.optional(),
  companyId: baseSchema.companyId.optional()
}).strict()

companyBranchSchema.updateSchema = z.object({
  name: baseSchema.name.optional(),
  companyId: baseSchema.companyId.optional(),
  location: baseSchema.location.optional() 
}).strict()










const objectIdRegex = /^[a-fA-F0-9]{24}$/;

const locationSchema = z.object({
  street: z.string().nullable().default(null),
  streeNumber: z.string().nullable().default(null),
  floor: z.string().nullable().default(null),
  apartment: z.string().nullable().default(null),
  city: z.string().nullable().default(null),
  postalCode: z.string().nullable().default(null),
  state: z.string().nullable().default(null),
  country: z.string().nullable().default(null),
  latitude: z.number().nullable().default(null),
  longitude: z.number().nullable().default(null),
}).nullable().default(null);

export const companyBranchCreateSchema = z.object({
  name: z.string(),
  companyId: z.string().regex(objectIdRegex, "Invalid ObjectId companyId").optional(),
  location: locationSchema.optional() 
})


export const companyBranchQuerySchema = z.object({
    companyId: z.string().regex(objectIdRegex, "Invalid ObjectId companyId").optional(),
    name: z.string().optional(),
});

export const companyBranchUpdateSchema = z.object({
  name: z.string().optional(),
  companyId: z.string().regex(objectIdRegex, "Invalid ObjectId companyId").optional(),
  location: locationSchema.optional()  
})







