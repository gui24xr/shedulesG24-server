import { RequestControllers } from "../../common/requestController.js";
import { providedServiceSchema } from "./providedServices.schemas.js";
import { providedServicesRepository } from './providedServices.repository.js'




class ProvidedServicesControllers extends RequestControllers{
    constructor({ repository, validateSchema,  }) {
        super({ repository, validateSchema })
    }
}


export const providedServicesControllers = new ProvidedServicesControllers({
    repository: providedServicesRepository,
    validateSchema: providedServiceSchema
})
    
