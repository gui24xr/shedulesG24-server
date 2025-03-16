import { router as pdfRouter } from '../services/createpdf.js'
import { authDevsRouter } from '../services/auth/auth.devs.routes.js'
import { companiesDevRouter } from './companies.routes.js'
import { providedServicesDevRouter } from './providedServices.routes.js'
import { shedulesDevRouter } from './shedules.routes.js'
import { customersDevRouter } from './customers.routes.js'
import { bookingsDevRouter } from './bookings.routes.js'
import { companyBranchsDevRouter } from './companyBranchs.routes.js'
import { notificationsConfigsDevRouter } from './notificationsConfigs.routes.js'
import { employeesDevRouter } from './employees.routes.js'
import { usersDevRouter } from './users.routes.js'
import { waitingListsDevRouter } from './waitinglists.routes.js'
import { sheduleSlotsDevRouter  } from './sheduleSlots.routes.js'

import { authUsersRouter } from '../services/auth/auth.users.routes.js'

export {
    pdfRouter,
    authDevsRouter ,
    authUsersRouter,

    bookingsDevRouter,
    providedServicesDevRouter,
    shedulesDevRouter,
    customersDevRouter,
    companiesDevRouter,
    companyBranchsDevRouter,
    notificationsConfigsDevRouter,
    employeesDevRouter,
    usersDevRouter,
    waitingListsDevRouter,
    sheduleSlotsDevRouter,
}