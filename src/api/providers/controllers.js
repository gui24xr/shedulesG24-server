import { RequestControllers } from "../../requestController.js";
import { providerSchema } from "./schema.js";
import { providersRepository } from "./repository.js";



class ProviderControllers extends RequestControllers{
    constructor({ repository, validateSchema,  }) {
        super({ repository, validateSchema })
    }
}


export const providersControllers = new ProviderControllers({
    repository: providersRepository,
    validateSchema: providerSchema
})
    
