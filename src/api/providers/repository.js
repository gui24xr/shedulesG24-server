import { MongooseRepository } from '../../database/mongooseRepository.js'
import { Provider } from '../../database/models/models.provider.js'
import { providerSchema } from './schema.js'


class ProvidersRepository extends MongooseRepository{
    constructor({ model, validateSchema, populateFieldsArray }) {
        super({ model, validateSchema, populateFieldsArray })
    }
}



export const providersRepository = new ProvidersRepository({
    model: Provider,
    validateSchema: providerSchema,
    populateFieldsArray: []
})


