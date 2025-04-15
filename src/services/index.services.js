import {logger} from '../config/logger.config.js'

import DbTransactionsService from './dbtransactions.service.js'

import {UserClientApp, Establishment, Owner} from '../models/index.js'
import AuthService from './auth.services.js'
import UsersService from './users.service.js'
import OwnersService from './owners.service.js'


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
    logger:logger
});


const ownersService = new OwnersService({
    ownersRepository:Owner,
    establishmentsRepository:Establishment,
    ownerSchema:ownerSchema,
    logger:logger   
});

const authService = new AuthService({
   ownersService:ownersService, 
   authSchema:authSchema,
});


export { usersService, authService, ownersService };


