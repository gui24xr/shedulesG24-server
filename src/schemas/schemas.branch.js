import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'


const branchSchema = z.object({
  name: validatorObject.isValidStablishmentName('name'),
  establishmentId: validatorObject.isValidId('establishmentId'),
  location: validatorObject.isValidLocation('location')
})

export default branchSchema;


