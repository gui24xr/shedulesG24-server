import { RequestControllers } from "../../common/requestController.js";
import { userSchema } from "./users.schemas.js";
import { usersRepository } from "./users.repository.js";



class UsersControllers extends RequestControllers{
    constructor({ repository, validateSchema,  }) {
        super({ repository, validateSchema })
    }
}


export const usersControllers = new UsersControllers({
    repository: usersRepository,
    validateSchema: userSchema
})
    
