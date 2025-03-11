import { RequestControllers } from "../../common/requestController.js";
import { providerSchema } from "./providers.schemas.js";
import { providersRepository } from "./providers.repository.js";



class ProvidersControllers extends RequestControllers{
    constructor({ repository, validateSchema,  }) {
        super({ repository, validateSchema })
    }
}


export const providersControllers = new ProvidersControllers({
    repository: providersRepository,
    validateSchema: providerSchema
})
    
