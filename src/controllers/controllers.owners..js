export default class OwnersController{
    constructor({ownersService,loggerManager= null}){
        this.ownersService = ownersService;
        this.loggerManager = loggerManager;
    }

    getOwnerProfileById = async(req,res,next)=>{
        try{
            const foundedOwnerProfile = await this.ownersService.getOwnerProfileById(req.user.authData.owner.id)
            return res.status(200).json(foundedOwnerProfile)
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting owner profile by id', error);
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

      

}
