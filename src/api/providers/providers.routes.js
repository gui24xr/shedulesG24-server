import express from  'express'
import { providersControllers } from './providers.controller.js'

export const router = express.Router()

router.post('/', providersControllers.create)
router.get('/:id',providersControllers.getOne)
router.get('/',providersControllers.getMany)
router.delete('/', providersControllers.deleteManyById)
router.put('/:id', providersControllers.updateById)

