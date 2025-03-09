import { MongooseRepository } from '../../common/mongooseRepository.js'
import { Company } from '../../models/index.js'
import { companySchema } from './companies.schemas.js'


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


