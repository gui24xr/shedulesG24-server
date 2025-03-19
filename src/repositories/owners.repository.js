import { MongooseRepository } from "../common/mongooseRepository.js";
import Owner from "../models/models.owner.js";
import { ownerSchema } from "../schemas/owner.schemas.js";


class OwnersRepository extends MongooseRepository{
    constructor({ model, validateSchema, populateFieldsArray }) {
        super({ model, validateSchema, populateFieldsArray })
    }
}

export const ownersRepository = new OwnersRepository({
    model: Owner,
    validateSchema: ownerSchema,
    populateFieldsArray: []
})

