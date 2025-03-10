import { RequestControllers } from "../../common/requestController.js";
import { waitingListSchema } from "./waitinglists.schemas.js";
import { waitingListsRepository } from "./waitinglists.repository.js";


class WaitingListsControllers extends RequestControllers{
    constructor({ repository, validateSchema,  }) {
        super({ repository, validateSchema })
    }
}


export const waitingListsControllers = new WaitingListsControllers({
    repository: waitingListsRepository,
    validateSchema: waitingListSchema
})
    
