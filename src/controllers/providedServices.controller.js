import { RequestControllers } from "../common/requestController.js";
import { providedServiceSchema } from "../schemas/providedServices.schemas.js";
import { providedServicesRepository } from '../repositories/providedServices.repository.js'




class ProvidedServicesControllers extends RequestControllers{
    constructor({ repository, validateSchema,  }) {
        super({ repository, validateSchema })
    }
}


export const providedServicesControllers = new ProvidedServicesControllers({
    repository: providedServicesRepository,
    validateSchema: providedServiceSchema
})
    
