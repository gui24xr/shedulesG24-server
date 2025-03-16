import { RequestControllers } from "../common/requestController.js";
import { notificationsConfigSchema } from "../schemas/notificationsConfigs.schema.js";
import { notificationsConfigsRepository } from "../repositories/notificationsConfigs.repository.js";



class NotificationsConfigsControllers extends RequestControllers{
    constructor({ repository, validateSchema,  }) {
        super({ repository, validateSchema })
    }
}


export const notificationsConfigsControllers = new NotificationsConfigsControllers({
    repository: notificationsConfigsRepository,
    validateSchema: notificationsConfigSchema
})
    
