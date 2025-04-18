class EstablishmentsController{
    constructor({establishmentsService,loggerManager=null}){
        this.establishmentsService = establishmentsService;
        this.loggerManager = loggerManager;
    }

    getEstablishmentById = async(req,res,next)=>{
        try{
            //Por ahora queda asi pero yo aca divido caminos si es clienntApp o adminApp
            const {eid:establishmentId} = req.params;
            const establishment = await this.establishmentsService.getOwnerEstablishmentById(req.user.authData.owner.id,establishmentId)
            return res.status(200).json(establishment)
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting establishment by id', error);
            next(error)
        }
    }
}

export default EstablishmentsController;