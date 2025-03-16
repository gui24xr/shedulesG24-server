import { RequestControllers } from "../common/requestController.js";
import { employeeSchema } from "../schemas/employee.schemas.js";
import { employeesRepository } from "../repositories/employees.repository.js";



class EmployeesControllers extends RequestControllers{
    constructor({ repository, validateSchema,  }) {
        super({ repository, validateSchema })
    }
}


export const employeesControllers = new EmployeesControllers({
    repository: employeesRepository,
    validateSchema: employeeSchema
})
    
