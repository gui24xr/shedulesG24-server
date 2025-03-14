import express from  'express'
import { waitingListsControllers } from './waitinglists.controller.js'
import { checkRole } from '../../middlewares/checkRole.js'
import passport from '../../config/passport.js'


export const waitingListsDevRouter = express.Router()

waitingListsDevRouter.use(passport.authenticate("jwt",{session:false}))
waitingListsDevRouter.use(checkRole(['dev']))


waitingListsDevRouter.post('/', waitingListsControllers.create)
waitingListsDevRouter.get('/:id',waitingListsControllers.getOne)
waitingListsDevRouter.get('/',waitingListsControllers.getMany)
waitingListsDevRouter.delete('/', waitingListsControllers.deleteManyById)
waitingListsDevRouter.put('/:id', waitingListsControllers.updateById)

