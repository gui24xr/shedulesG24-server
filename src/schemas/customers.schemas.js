import { z } from 'zod'
import { validatorObject } from '../common/commonSchemas.js'

export const customerSchema = {}

const baseSchema = {
  userId: validatorObject.isValidId('userId'),
  dni: validatorObject.isValidDNI('dni'),
  customerNumber: z.string(),
  companyId: validatorObject.isValidId('companyId'),
  firstName: validatorObject.isValidName('firstName'),
  lastName: validatorObject.isValidName('lastName'),
  phoneNumber: validatorObject.isValidPhone('phoneNumber'),
  email: validatorObject.isValidEmail('email')
}

const baseCustomerSchema = z.object({
  userId: validatorObject.isValidId('userId'),
  dni: validatorObject.isValidDNI('dni'),
  customerNumber: z.string(),
  companyId: validatorObject.isValidId('companyId'),
  firstName: validatorObject.isValidName('firstName'),
  lastName: validatorObject.isValidName('lastName'),
  phoneNumber: validatorObject.isValidPhone('phoneNumber'),
  email: validatorObject.isValidEmail('email')
})

customerSchema.createSchema = z.object({
  userId: baseSchema.userId.optional(),
  companyId: baseSchema.companyId,
  customerNumber: baseSchema.customerNumber.optional(),
  dni: baseSchema.dni.optional(), //Ojo aca
  firstName: baseSchema.firstName,
  lastName: baseSchema.lastName,
  email: baseSchema.email,
  phoneNumber: baseSchema.phoneNumber
})


customerSchema.querySchema = z.object({
  userId: baseSchema.userId.optional(),
  dni: baseSchema.dni.optional(),
  companyId: baseSchema.companyId.optional(),
  firstName: baseSchema.firstName.optional(),
  lastName: baseSchema.lastName.optional(),
  email: baseSchema.email.optional(),
  phoneNumber: baseSchema.phoneNumber.optional()
}).strict()

customerSchema.updateSchema = z.object({
  userId: baseSchema.userId.optional(),
  dni: baseSchema.dni.optional(),
  firstName: baseSchema.firstName.optional(),
  lastName: baseSchema.lastName.optional(),
  email: baseSchema.email.optional(),
  phoneNumber: baseSchema.phoneNumber.optional()
}).strict()

export default baseCustomerSchema;
