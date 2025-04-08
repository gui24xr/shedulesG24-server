import {logger} from '../config/logger.config.js'

import User from '../models/models.user.js'
import AuthService from './auth.services.js'
import UsersService from './users.service.js'
import CompaniesService from './companies.services.js'
import OwnerService from './owners.service.js'


import { Company, Owner} from '../models/index.js'


import {
    baseUserSchema as userSchema,
    authSchema,
    baseCompanySchema as companySchema,
    baseOwnerSchema as ownerSchema
} from '../schemas/index.js'







const usersService = new UsersService(User, userSchema);
const authService = new AuthService(usersService, authSchema);
        const companiesService = new CompaniesService(Company, companySchema, logger);
const ownerService = new OwnerService(Owner, ownerSchema, logger);

export { usersService, authService, companiesService, ownerService };


