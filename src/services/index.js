import { loggerManager, jwtManager } from '../managers/index.js'
import catalogsData from '../constants/index.js'
import DbTransactionsService from './dbtransactions.service.js'

import {TenantsAppsUser, Establishment, Owner, Employee, Profile,Location,Branch,EstablishmentConfig,IssuedRefreshToken} from '../models/index.js'

import AuthService from './auth.services.js'
import UsersService from './users.service.js'
import OwnersService  from './services.owners.js'
import EstablishmentsService from './services.establishments.js'
import CatalogsService from './services.catalogs.js'
import EmployeesService from './services.employees.js'
import WorkProfileData from '../models/models.workProfileData.js'

import {
    authSchema,
    tenantsAppsUserSchema,
    establishmentSchema,
    ownerSchema,    
    employeeSchema,
    profileSchema,
    
} from '../schemas/index.js'






const tenantsAppsUsersService = new UsersService({
    usersRepository:TenantsAppsUser, 
    companiesRepository:Establishment,
    ownersRepository:Owner,
    userSchema: tenantsAppsUserSchema, 
    companySchema: establishmentSchema,
    ownerSchema: ownerSchema,
    dbTransactionsService:DbTransactionsService,
    loggerManager:loggerManager
});


const ownersService = new OwnersService({
    ownersRepository:Owner,
    establishmentsRepository:Establishment,
    profilesRepository:Profile,  
    profileSchema:profileSchema,
    ownerSchema:ownerSchema,
    dbTransactionsService:DbTransactionsService,
    loggerManager:loggerManager,
});

const authService = new AuthService({
   ownersService:ownersService, 
   issuedRefreshToken:IssuedRefreshToken,
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
    employeesRepository:Employee,
    establishmentSchema:establishmentSchema,
    locationsRepository:Location,
    branchesRepository:Branch,
    establishmentsConfigRepository:EstablishmentConfig,
    dbTransactionsService:DbTransactionsService,
    loggerManager:loggerManager
});

const employeesService = new EmployeesService({
    employeesRepository:Employee,
    profilesRepository:Profile,
    workProfileDataRepository:WorkProfileData,
    establishmentsRepository:Establishment,
    dbTransactionsService:DbTransactionsService,
    loggerManager:loggerManager
});

export { tenantsAppsUsersService, authService, ownersService, establishmentsService, catalogsService, employeesService };


