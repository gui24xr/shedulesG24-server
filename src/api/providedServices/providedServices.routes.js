import express from  'express'
import { providedServicesControllers } from './providedServices.controller.js'

export const router = express.Router()

router.post('/', providedServicesControllers.create)
router.get('/:id',providedServicesControllers.getOne)
router.get('/',providedServicesControllers.getMany)
router.delete('/', providedServicesControllers.deleteManyById)
router.put('/:id', providedServicesControllers.updateById)

