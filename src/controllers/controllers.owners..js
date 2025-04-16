export default class OwnersController{
    constructor({ownersService,establishmentsService,loggerManager= null}){
        this.ownersService = ownersService;
        this.establishmentsService = establishmentsService;
        this.loggerManager = loggerManager;
    }

    getOwnerById = async(req,res,next)=>{
        try{
            const foundedOwner = await this.ownersService.getOwnerById(req.user.owner.id)
            return res.status(200).json(foundedOwner)
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting owner by id', error);
            next(error)
        }
    }

    updateOwnerProfile = async(req,res,next)=>{
        try{
            const updatedOwner = await this.ownersService.updateOwnerProfile(req.user.owner.id, req.body)
            return res.status(200).json(updatedOwner)
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error updating owner profile', error);
            next(error)
        }
    }

    createBasicEstablishment = async(req,res,next)=>{
        try{
            //validar que body tenga category,hasOnlyBranch,name)
            const basicEstablishmentData = {...req.body, ownerId: req.user.owner.id}
            const newEstablishment = await this.establishmentsService.createBasicEstablishment(basicEstablishmentData)
            return res.status(201).json(newEstablishment)
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error creating establishment', error);
            next(error)
        }
    }
}
