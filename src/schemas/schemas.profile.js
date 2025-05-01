import {z} from 'zod'
import { validatorObject } from '../common/commonSchemas.js'




const profileSchema = z.object({
    firstName: validatorObject.isValidName('firstName'),
    lastName: validatorObject.isValidName('lastName'),
    email: validatorObject.isValidEmail('email'),
    phone: validatorObject.isValidPhone('phone'),
    profilePicture: validatorObject.isValidImageURL('profilePicture'),
   // ownerId: validatorObject.isValidId('ownerIs'),
   // employeeId: validatorObject.isValidId('employeeId'),
   // tenantsAppsUserId: validatorObject.isValidId('tenantsAppsUserId'),      
    

})                  

export default profileSchema;   