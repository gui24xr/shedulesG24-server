import express from  'express'
import { usersControllers } from './users.controllers.js'

export const router = express.Router()

router.post('/', usersControllers.create)
router.get('/:id',usersControllers.getOne)
router.get('/',usersControllers.getMany)
router.delete('/', usersControllers.deleteManyById)
router.put('/:id', usersControllers.updateById)

