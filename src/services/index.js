import { loggerManager, jwtManager } from '../managers/index.js'
import catalogsData from '../constants/index.js'
import DbTransactionsService from './dbtransactions.service.js'

import {UserClientApp, Establishment, Owner, Branch} from '../models/index.js'
import AuthService from './auth.services.js'
import UsersService from './users.service.js'
import OwnersService  from './services.owners.js'
import EstablishmentsService from './services.establishments.js'
import CatalogsService from './services.catalogs.js'

import {
    authSchema,
    userClientAppSchema,
    establishmentSchema,
    ownerSchema,
} from '../schemas/index.js'






const usersService = new UsersService({
    usersRepository:UserClientApp, 
    companiesRepository:Establishment,
    ownersRepository:Owner,
    userSchema: userClientAppSchema, 
    companySchema: establishmentSchema,
    ownerSchema: ownerSchema,
    dbTransactionsService:DbTransactionsService,
    loggerManager:loggerManager
});


const ownersService = new OwnersService({
    ownersRepository:Owner,
    establishmentsRepository:Establishment,
    ownerSchema:ownerSchema,
    loggerManager:loggerManager
});

const authService = new AuthService({
   ownersService:ownersService, 
   authSchema:authSchema,
   loggerManager:loggerManager,
   jwtManager:jwtManager
});


const catalogsService = new CatalogsService({
    catalogsData:catalogsData,
    loggerManager:loggerManager
});

const establishmentsService = new EstablishmentsService({
    establishmentsRepository:Establishment,
    branchesRepository:Branch,
    establishmentSchema:establishmentSchema,
    loggerManager:loggerManager
});

export { usersService, authService, ownersService, establishmentsService, catalogsService };


