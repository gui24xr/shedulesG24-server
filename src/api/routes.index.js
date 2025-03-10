import { router as pdfRouter } from './test/createpdf.js'
import { router as authRouter } from './auth/auth.routes.js'
import { router as companiesRouter } from './companies/companies.routes.js'
import { router as offeringsRouter } from './offerings/offerings.routes.js'
import { router as shedulesRouter } from './shedules/shedules.routes.js'
import { router as customersRouter } from './customers/customers.routes.js'
import { router as bookingsRouter } from './bookings/bookings.routes.js'
import { router as companyBranchsRouter } from './companyBranchs/companyBranchs.routes.js'
import { router as notificationsConfigsRouter } from './notificationsConfigs/notificationsConfigs.routes.js'
import { router as providersRouters } from './providers/providers.routes.js'
import { router as usersRouters } from './users/users.routes.js'
import { router as waitingListsRouter } from './waitinglists/waitinglists.routes.js'
import { router as sheduleSlotsRouter } from './sheduleSlots/sheduleSlots.routes.js'

export {
    pdfRouter,
    authRouter,
    companiesRouter,
    offeringsRouter,
    shedulesRouter,
    customersRouter,
    bookingsRouter,
    companyBranchsRouter,
    notificationsConfigsRouter,
    providersRouters,
    usersRouters,
    waitingListsRouter,
    sheduleSlotsRouter
}