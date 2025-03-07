import express from  'express'
import { CustomersControllers } from './controllers.js'

export const router = express.Router()

const customersControllers = new CustomersControllers()

router.post('/', customersControllers.createCustomer)
router.get('/:cid',customersControllers.getOne)
router.get('/',customersControllers.getMany)
router.delete('/',customersControllers.deleteCustomers)
router.put('/:cid',customersControllers.updateCustomerData)
