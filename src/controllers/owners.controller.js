import { RequestControllers } from "../common/requestController.js";
import { ownerSchema } from "../schemas/owner.schemas.js";
import { ownersRepository } from "../repositories/owners.repository.js";



class OwnersControllers extends RequestControllers{
    constructor({ repository, validateSchema,  }) {
        super({ repository, validateSchema })
    }
}


export const ownersControllers = new OwnersControllers({
    repository: ownersRepository,
    validateSchema: ownerSchema
})
    
