export class CustomersControllers{
    async getCustomers(req,res,next){
        try{
            res.status(204)
        }catch(error){
            res.status(500),json({message:error})
        }
    }

    async createCustomer(req,res,next){
        try{
            res.status(204)
        }catch(error){
            res.status(500),json({message:error})
        }
    }
}