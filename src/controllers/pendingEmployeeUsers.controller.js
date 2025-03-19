import { RequestControllers } from "../common/requestController.js";
import { pendingEmployeeUserSchema } from "../schemas/PendingEmployeeUsers.schemas.js";
import { pendingEmployeeUsersRepository } from "../repositories/pendingEmployeeUsers.repository.js";



class PendingEmployeeUsersControllers extends RequestControllers{
    constructor({ repository, validateSchema,  }) {
        super({ repository, validateSchema })
    }
}


export const pendingEmployeeUsersControllers = new PendingEmployeeUsersControllers({
    repository: pendingEmployeeUsersRepository,
    validateSchema: pendingEmployeeUserSchema
})
    
