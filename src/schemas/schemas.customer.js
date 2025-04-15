import { z } from 'zod'
import { validatorObject } from '../common/commonSchemas.js'


const customerSchema = z.object({
  userClientAppId: validatorObject.isValidId('userClientAppId'),  
  dni: validatorObject.isValidDNI('dni'),
  customerNumber: z.string(),
  establishmentId: validatorObject.isValidId('establishmentId'),
  firstName: validatorObject.isValidName('firstName'),
  lastName: validatorObject.isValidName('lastName'),
  phoneNumber: validatorObject.isValidPhone('phoneNumber'),
  email: validatorObject.isValidEmail('email')
})


export default customerSchema;
