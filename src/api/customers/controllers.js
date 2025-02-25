import { CustomersRepository } from "./repository.js"
import { customerSchema } from "./schema.js"

const customersRepository = new CustomersRepository()


export class CustomersControllers{

        async createCustomer(req,res,next){
            try{
                customerSchema.parse(req.body)
                const createdCustomer = await customersRepository.createCustomer(req.body)
                return res.status(201).json({customer: createdCustomer})
            }catch(error){
               next(error)
            }
        }

        async getCustomers(req,res,next){
            try{
                const {cid:customerId} = req.params
               if (!customerId){
                    return res.status(201).json({customers: await customersRepository.getCustomers()})
                }
                return res.status(201).json({customer: await customersRepository.getCustomer(customerId)})
            }catch(error){
               next(error)
            }
        }

        async deleteCustomers(req,res,next){
            try{
                const ids = req.query.ids?.split(",");
                const result = await customersRepository.deleteCustomers(ids)
                return res.status(201).json({message:`Se han borrado ${result} customers.`})
            }catch(error){
                next(error)
            }
        }
    
}


