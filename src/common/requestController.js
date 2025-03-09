

export class RequestControllers{

        constructor({repository,validateSchema}){
            this.repository = repository
            this.schema = validateSchema
        }

         create = async(req,res,next) => {
            try{
                this.schema.createSchema.parse(req.body)
                return res.status(201).json({...await this.repository.create(req.body)})
            }catch(error){
               next(error)
            }
        }

        getOne = async(req,res,next) => {
            try{
                return res.status(200).json({...await this.repository.getById(req.params.id)})
            }catch(error){
                next(error)
            }
        }

        
        getMany = async(req,res,next) => {
            try{
                if (Object.keys(req.query).length>0){
                    this.schema.querySchema.parse(req.query)
                    return res.status(200).json([...await this.repository.getByQuery(req.query)])
                }
                return res.status(200).json([...await this.repository.getByQuery({})])
                
            }catch(error){
                next(error)
            }
        }

       
        updateById = async(req,res,next) => {
            try{
                this.schema.updateSchema.parse(req.body)
                return res.status(200).json({...await this.repository.updateById(req.params.id,req.body)})
            }catch(error){
                next(error)
            }
        }

        deleteManyById = async(req,res,next) => {
            try{
                const ids = req.query.ids?.split(",");
                await this.repository.deleteCustomers(ids)
                return res.status(204) 
            }catch(error){
                next(error)
            }
        }
    
}


