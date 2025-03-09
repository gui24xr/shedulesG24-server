import { RequestControllers } from "../../common/requestController.js";
import { offeringsRepository } from "./offerings.repository.js";
import { offeringSchema } from "./offerings.schema.js";




class OfferingsControllers extends RequestControllers{
    constructor({ repository, validateSchema,  }) {
        super({ repository, validateSchema })
    }
}


export const offeringsControllers = new OfferingsControllers({
    repository: offeringsRepository,
    validateSchema: offeringSchema
})
    