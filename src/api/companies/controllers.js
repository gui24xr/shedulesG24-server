import { RequestControllers } from "../../requestController.js";
import { companySchema } from "./schema.js";
import { companiesRepository } from "./repository.js";



class CompaniesControllers extends RequestControllers{
    constructor({ repository, validateSchema,  }) {
        super({ repository, validateSchema })
    }
}


export const companiesControllers = new CompaniesControllers({
    repository: companiesRepository,
    validateSchema: companySchema
})
    
