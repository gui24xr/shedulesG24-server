import { BasicCrud } from '../common/BasicCrud.js'
import * as validationsSchemas from '../schemas/index.js'
import * as mongooseModels from '../models/index.js'


const entitiesList = [
    {collectionName: 'bookings',model: mongooseModels.Booking, validateSchema: validationsSchemas.bookingSchema},
    {collectionName: 'companies',model: mongooseModels.Company, validateSchema: validationsSchemas.companySchema},
    {collectionName: 'customers',model: mongooseModels.Customer, validateSchema: validationsSchemas.customerSchema},
    {collectionName: 'employees',model: mongooseModels.Employee, validateSchema: validationsSchemas.employeeSchema},
]

const entitiesListWithoutValidation = [
    {collectionName: 'bookings',model: mongooseModels.Booking, },
    {collectionName: 'companies',model: mongooseModels.Company},
    {collectionName: 'customers',model: mongooseModels.Customer},
    {collectionName: 'employees',model: mongooseModels.Employee},
]



const basicCrudDevelopment = new BasicCrud({
    middlewareOrderedArray: [],
    entitiesList: entitiesListWithoutValidation
})

export const developmentRouter = basicCrudDevelopment.getRouter()

//console.log(basicCrudDevelopment.getRoutesList())