import { loggerManager } from "../managers/index.js";
import AuthController from "./controllers.auth.js";
import OwnersController from "./controllers.owners..js";
import CatalogsController from "./controllers.catalogs.js";
import { authService, ownersService, catalogsService, establishmentsService} from "../services/index.js";


const authController = new AuthController({authService:authService,loggerManager:loggerManager});

const ownersController = new OwnersController({
    ownersService:ownersService,
    loggerManager:loggerManager,
    establishmentsService:establishmentsService
});
const catalogsController = new CatalogsController({catalogsService:catalogsService,loggerManager:loggerManager});

export {
    authController,
    ownersController,
    catalogsController
}

