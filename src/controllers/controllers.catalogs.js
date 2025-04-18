class CatalogsController{
    constructor({catalogsService,loggerManager=null}){
        this.catalogsService = catalogsService;
        this.loggerManager = loggerManager;
    }
    
    getBusinessCategories = (req,res,next)=>{
        try{
            const businessCategories = this.catalogsService.getBusinessCategories();
            return res.status(200).json(businessCategories);
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting business categories', error);
            next(error);
        }
    }

    getSchedulingConfigType = (req,res,next)=>{
        try{
            const schedulingConfigTypeCategories = this.catalogsService.getSchedulingConfigTypeCategories();
            return res.status(200).json(schedulingConfigTypeCategories);
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting scheduling config type categories', error);
            next(error);
        }
    }

    getEstablishmentStatus = (req,res,next)=>{
        try{
            const establishmentStatus = this.catalogsService.getEstablishmentStatus();
            return res.status(200).json(establishmentStatus);
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting establishment status', error);
            next(error);
        }
    }
}

export default CatalogsController;         
