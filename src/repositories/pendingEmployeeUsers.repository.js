import { MongooseRepository } from "../common/mongooseRepository.js";
import PendingEmployeeUser from "../models/models.booking.js";
import { pendingEmployeeUserSchema } from "../schemas/PendingEmployeeUsers.schemas.js";



class PendingEmployeeUsersRepository extends MongooseRepository{
    constructor({ model, validateSchema, populateFieldsArray }) {
        super({ model, validateSchema, populateFieldsArray })
    }
}

export const pendingEmployeeUsersRepository = new PendingEmployeeUsersRepository({
    model: PendingEmployeeUser,
    validateSchema: pendingEmployeeUserSchema,
    populateFieldsArray: []
})

