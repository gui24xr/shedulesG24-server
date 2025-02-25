import express from  'express'
import { CustomersControllers } from './controllers.js'

export const router = express.Router()

const customersControllers = new CustomersControllers()
const defaultFunction = (req,res,next) => {res.send("Default function")}

router.get('/:cid?',customersControllers.getCustomers)
router.post('/', customersControllers.createCustomer)
router.delete('/',customersControllers.deleteCustomers)