class EstablishmentsController{
    constructor({establishmentsService,loggerManager=null}){
        this.establishmentsService = establishmentsService;
        this.loggerManager = loggerManager;
    }

    createEstablishment = async(req,res,next)=>{
        try{
            //validar que body tenga category,hasOnlyBranch,businessCategory,schedulingConfigType)
            const ownerId = req.user.owner.id
            const payload = req.body
            const newEstablishment = await this.establishmentsService.createEstablishment({ownerId,payload})
            return res.status(201).json(newEstablishment)
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error creating establishment', error);
            next(error)
        }
    }

    getEstablishmentById = async(req,res,next)=>{
        try{
            //Por ahora queda asi pero yo aca divido caminos si es clienntApp o adminApp
            const {eid:establishmentId} = req.params;
            const establishment = await this.establishmentsService.getOwnerEstablishmentById(req.user.owner.id,establishmentId)
            return res.status(200).json(establishment)
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting establishment by id', error);
            next(error)
        }
    }

    getOwnerEstablishments = async(req,res,next) =>{
        try{
            //const ownerEstablishments = await this.establishmentsService.getOwnerEstablishments(req.user.authData.owner.id)
             const ownerEstablishments = await this.establishmentsService.getOwnerEstablishments(req.user.owner.id)
             return res.status(200).json(ownerEstablishments)
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting owner establishments', error);
            next(error)
        }
    }


}

export default EstablishmentsController;