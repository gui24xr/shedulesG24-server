import { MongooseRepository } from '../../common/mongooseRepository.js'
import { WaitingList } from '../../models/index.js'
import { waitingListSchema } from './waitinglists.schemas.js'


class WaitingListsRepository extends MongooseRepository{
    constructor({ model, validateSchema, populateFieldsArray }) {
        super({ model, validateSchema, populateFieldsArray })
    }
}

export const waitingListsRepository = new WaitingListsRepository({
    model: WaitingList,
    validateSchema: waitingListSchema,
    populateFieldsArray: []
})


