import {logger} from '../config/logger.config.js'

import DbTransactionsService from './dbtransactions.service.js'

import {UserClientApp, Company, Owner} from '../models/index.js'
import AuthService from './auth.services.js'
import UsersService from './users.service.js'
import OwnersService from './owners.service.js'





import {
    baseUserSchema as userSchema,
    authSchema,
    baseCompanySchema as companySchema,
    baseOwnerSchema as ownerSchema
} from '../schemas/index.js'






const usersService = new UsersService({
    usersRepository:UserClientApp, 
    companiesRepository:Company,
    ownersRepository:Owner,
    userSchema: userSchema, 
    companySchema: companySchema,
    ownerSchema: ownerSchema,
    dbTransactionsService:DbTransactionsService,
    logger:logger
});


const ownersService = new OwnersService({
    ownersRepository:Owner,
    companiesRepository:Company,
    ownerSchema:ownerSchema,
    logger:logger   
});

const authService = new AuthService({
   ownersService:ownersService, 
    authSchema
});


export { usersService, authService, ownersService };


