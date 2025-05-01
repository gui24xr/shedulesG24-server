import { loggerManager } from "../managers/index.js";
import AuthController from "./controllers.auth.js";
import OwnersController from "./controllers.owners..js";
import CatalogsController from "./controllers.catalogs.js";
import EstablishmentsController from "./controllers.establishments..js";
import EmployeesController from "./controllers.employees.js";
import { authService, ownersService, catalogsService, establishmentsService, employeesService   } from "../services/index.js";


const authController = new AuthController({authService:authService,loggerManager:loggerManager});

const ownersController = new OwnersController({
    ownersService:ownersService,
    loggerManager:loggerManager,
});
const catalogsController = new CatalogsController({catalogsService:catalogsService,loggerManager:loggerManager});
const establishmentsController = new EstablishmentsController({establishmentsService:establishmentsService,loggerManager:loggerManager});
const employeesController = new EmployeesController({employeesService:employeesService,loggerManager:loggerManager});
export {
    authController,
    ownersController,
    catalogsController,
    establishmentsController,
    employeesController
}

