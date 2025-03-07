import { CustomersRepository } from "./repository.js"
import { customerSchema } from "./schema.js"

const customersRepository = new CustomersRepository()


export class CustomersControllers{

        async createCustomer(req,res,next){
            try{
                customerSchema.createSchema.parse(req.body)
                return res.status(201).json({...await customersRepository.createCustomer(req.body)})
            }catch(error){
               next(error)
            }
        }

        async getOne(req,res,next){
            try{
                const {cid:customerId} = req.params
                return res.status(200).json({...await customersRepository.getCustomerById(customerId)})
            }catch(error){
                next(error)
            }
        }

        
        async getMany(req,res,next){
            try{
                if (Object.keys(req.query).length>0){
                    customerSchema.querySchema.parse(req.query)
                    return res.status(200).json([...await customersRepository.getCustomers(req.query)])
                }
                return res.status(200).json([...await customersRepository.getCustomers({})])
                
            }catch(error){
                next(error)
            }
        }

       
        async updateCustomerData(req,res,next){
            try{
                const {cid:customerId} = req.params
                customerSchema.updateSchema.parse(req.body)
                return res.status(200).json({...await customersRepository.updateCustomerData(customerId,req.body)})
            }catch(error){
                next(error)
            }
        }

        async deleteCustomers(req,res,next){
            try{
                const ids = req.query.ids?.split(",");
                await customersRepository.deleteCustomers(ids)
                return res.status(204) 
            }catch(error){
                next(error)
            }
        }
    
}


