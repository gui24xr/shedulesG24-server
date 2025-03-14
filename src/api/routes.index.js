import { router as pdfRouter } from './test/createpdf.js'
import { authRouter } from './auth/auth.routes.js'
import { companiesDevRouter } from './companies/companies.routes.js'
import { providedServicesDevRouter } from './providedServices/providedServices.routes.js'
import { shedulesDevRouter } from './shedules/shedules.routes.js'
import { customersDevRouter } from './customers/customers.routes.js'
import { bookingsDevRouter } from './bookings/bookings.routes.js'
import { companyBranchsDevRouter } from './companyBranchs/companyBranchs.routes.js'
import { notificationsConfigsDevRouter } from './notificationsConfigs/notificationsConfigs.routes.js'
import { providersDevRouter  } from './providers/providers.routes.js'
import { usersDevRouter  } from './users/users.routes.js'
import { waitingListsDevRouter } from './waitingLists/waitingLists.routes.js'
import { sheduleSlotsDevRouter  } from './sheduleSlots/sheduleSlots.routes.js'

export {
    pdfRouter,
    authRouter,

    bookingsDevRouter,
    providedServicesDevRouter,
    shedulesDevRouter,
    customersDevRouter,
    companiesDevRouter,
    companyBranchsDevRouter,
    notificationsConfigsDevRouter,
    providersDevRouter,
    usersDevRouter,
    waitingListsDevRouter,
    sheduleSlotsDevRouter,
}