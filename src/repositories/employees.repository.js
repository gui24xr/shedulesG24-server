import { MongooseRepository } from '../common/mongooseRepository.js'
import { Employee } from '../models/index.js'
import { employeeSchema } from '../schemas/employee.schemas.js'


class EmployeesRepository extends MongooseRepository{
    constructor({ model, validateSchema, populateFieldsArray }) {
        super({ model, validateSchema, populateFieldsArray })
    }
}

export const employeesRepository = new EmployeesRepository({
    model: Employee,
    validateSchema: employeeSchema,
    populateFieldsArray: []
})


