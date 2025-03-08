import { MongooseRepository } from '../../database/mongooseRepository.js'
import { Company } from '../../database/models/models.company.js'
import { companySchema } from './schema.js'


class CompaniesRepository extends MongooseRepository{
    constructor({ model, validateSchema, populateFieldsArray }) {
        super({ model, validateSchema, populateFieldsArray })
    }
}



export const companiesRepository = new CompaniesRepository({
    model: Company,
    validateSchema: companySchema,
    populateFieldsArray: []
})


