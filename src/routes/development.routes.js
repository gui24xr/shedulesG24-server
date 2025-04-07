import MongooseDynamicApi from 'mongoose-dynamic-api'
import * as mongooseModels from '../models/index.js'


const entitiesListWithoutValidation = Object.keys(mongooseModels).map(item => ({ collectionName: item.toLowerCase(), model: mongooseModels[item]}))


const basicCrudDevelopment = new MongooseDynamicApi({
        apiName: 'Development Crud Api',
        middlewareOrderedArray: [],
        fakeUsersEnabled: true,
        loggingEnabled: false,
        entitiesList: entitiesListWithoutValidation
})

export const developmentRouter = basicCrudDevelopment.getRouter()
