import { MongooseRepository } from '../../common/mongooseRepository.js'
import { ProvidedService } from '../../models/index.js'
import { providedServiceSchema } from './providedServices.schemas.js'


class ProvidedServicesRepository extends MongooseRepository{
    constructor({ model, validateSchema, populateFieldsArray }) {
        super({ model, validateSchema, populateFieldsArray })
    }
}

export const providedServicesRepository = new ProvidedServicesRepository({
    model: ProvidedService,
    validateSchema: providedServiceSchema,
    populateFieldsArray: []
})


