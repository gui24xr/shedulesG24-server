import express from  'express'
import { waitingListsControllers } from './waitinglists.controller.js'

export const router = express.Router()

router.post('/', waitingListsControllers.create)
router.get('/:id',waitingListsControllers.getOne)
router.get('/',waitingListsControllers.getMany)
router.delete('/', waitingListsControllers.deleteManyById)
router.put('/:id', waitingListsControllers.updateById)

