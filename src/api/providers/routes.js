import express from  'express'
import { providersControllers } from './controllers.js'

export const router = express.Router()

router.post('/', providersControllers.create)
router.get('/:id',providersControllers.getOne)
router.get('/',providersControllers.getMany)
router.delete('/', providersControllers.deleteManyById)
router.put('/:id', providersControllers.updateById)

