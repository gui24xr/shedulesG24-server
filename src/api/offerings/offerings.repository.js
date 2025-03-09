import { MongooseRepository } from '../../common/mongooseRepository.js'
import Offering from '../../models/models.offering.js'
import { offeringSchema } from './offerings.schema.js'


class OfferingsRepository extends MongooseRepository{
    constructor({ model, validateSchema, populateFieldsArray }) {
        super({ model, validateSchema, populateFieldsArray })
    }
  }
  
  export const offeringsRepository = new OfferingsRepository({
    model: Offering,
    validateSchema: offeringSchema,
    populateFieldsArray: []
  })
  