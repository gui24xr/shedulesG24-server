import { MongooseRepository } from '../../common/mongooseRepository.js'
import { Provider } from '../../models/index.js'
import { providerSchema } from './provider.schemas.js'


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


