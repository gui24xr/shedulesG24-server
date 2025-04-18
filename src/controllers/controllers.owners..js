export default class OwnersController{
    constructor({ownersService,establishmentsService,loggerManager= null}){
        this.ownersService = ownersService;
        this.establishmentsService = establishmentsService;
        this.loggerManager = loggerManager;
    }

    getOwnerById = async(req,res,next)=>{
        try{
            const foundedOwner = await this.ownersService.getOwnerById(req.user.authData.owner.id)
            return res.status(200).json(foundedOwner)
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting owner by id', error);
            next(error)
        }
    }

    updateOwnerProfile = async(req,res,next)=>{
        try{
            const updatedOwner = await this.ownersService.updateOwnerProfile(req.user.authData.owner.id, req.body)
            return res.status(200).json(updatedOwner)
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error updating owner profile', error);
            next(error)
        }
    }

    createBasicEstablishment = async(req,res,next)=>{
        try{
            //validar que body tenga category,hasOnlyBranch,businessCategory,schedulingConfigType)
            const basicEstablishmentData = {...req.body, ownerId: req.user.authData.owner.id}
            const newEstablishment = await this.establishmentsService.createBasicEstablishment(basicEstablishmentData)
            return res.status(201).json(newEstablishment)
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error creating establishment', error);
            next(error)
        }
    }

    getOwnerEstablishments = async(req,res,next) =>{
        try{
            const ownerEstablishments = await this.establishmentsService.getOwnerEstablishments(req.user.authData.owner.id)
            return res.status(200).json(ownerEstablishments)
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting owner establishments', error);
            next(error)
        }
    }

}
