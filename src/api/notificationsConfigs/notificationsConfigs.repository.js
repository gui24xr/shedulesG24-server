import { MongooseRepository } from '../../common/mongooseRepository.js'
import { NotificationsConfig } from '../../models/index.js'
import { notificationsConfigSchema } from './notificationsConfigs.schema.js'


class NotificationsConfigsRepository extends MongooseRepository{
    constructor({ model, validateSchema, populateFieldsArray }) {
        super({ model, validateSchema, populateFieldsArray })
    }
}

export const notificationsConfigsRepository = new NotificationsConfigsRepository({
    model: NotificationsConfig,
    validateSchema: notificationsConfigSchema,
    populateFieldsArray: []
})


