/*

import {z} from 'zod'
import { validatorObject } from '../../common/commonSchemas.js'

export const shedulesSchema = {}

const baseSchema = {
    companyId: validatorObject.isValidId('companyId'),
    firstName: validatorObject.isValidName('firstName'),
    lastName: validatorObject.isValidName('lastName'),
    specialty: z.string(),
    phoneNumber: validatorObject.isValidPhone('phoneNumber'),
    email: validatorObject.isValidEmail('email'),

    slots
}


shedulesSchema.createSchema = z.object({
    companyId: baseSchema.companyId,
    firstName: baseSchema.firstName,
    lastName: baseSchema.lastName,
    specialty: baseSchema.specialty,
    phoneNumber: baseSchema.phoneNumber,
    email: baseSchema.email
}).strict()



shedulesSchema.querySchema = z.object({
    companyId: baseSchema.companyId.optional(),
    firstName: baseSchema.firstName.optional(),
    lastName: baseSchema.lastName.optional(),
    specialty: baseSchema.specialty.optional(),
}).strict()


shedulesSchema.updateSchema = z.object({
    companyId: baseSchema.companyId.optional(),
    firstName: baseSchema.firstName.optional(),
    lastName: baseSchema.lastName.optional(),
    specialty: baseSchema.specialty.optional(),
    phoneNumber: baseSchema.phoneNumber.optional(),
    email: baseSchema.email.optional()
}).strict()



//ESPECIFICO DE ESTE MODELO

const isValidSlot = (field) => z.object({
    street: z.string().nullable().default(null),
    streetNumber: z.string().nullable().default(null),
    floor: z.string().nullable().default(null),
    apartment: z.string().nullable().default(null),
    city: z.string().nullable().default(null),
    postalCode: z.string().nullable().default(null),
    state: z.string().nullable().default(null),
    country: z.string().nullable().default(null),
    latitude: z.number().nullable().default(null),
    longitude: z.number().nullable().default(null),
  }).nullable().default(null).refine(val => val !== null || val === null, {
    message: `El valor ${field ? `en el campo ${field}` : ""} debe ser una ubicación válida o null.`,
  })

  */