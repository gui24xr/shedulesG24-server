import { RequestControllers } from "../../common/requestController.js";
import { companySchema } from "./companies.schemas.js";
import { companiesRepository } from "./companies.repository.js";



class CompaniesControllers extends RequestControllers{
    constructor({ repository, validateSchema,  }) {
        super({ repository, validateSchema })
    }
}


export const companiesControllers = new CompaniesControllers({
    repository: companiesRepository,
    validateSchema: companySchema
})
    
