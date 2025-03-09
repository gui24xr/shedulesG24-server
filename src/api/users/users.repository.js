import { MongooseRepository } from '../../common/mongooseRepository.js'
import { User } from '../../models/index.js'
import { userSchema } from './users.schemas.js'


class UsersRepository extends MongooseRepository{
    constructor({ model, validateSchema, populateFieldsArray }) {
        super({ model, validateSchema, populateFieldsArray })
    }
}

export const usersRepository = new UsersRepository({
    model: User,
    validateSchema: userSchema,
    populateFieldsArray: []
})


