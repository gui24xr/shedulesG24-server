class CatalogsController{
    constructor({catalogsService,loggerManager=null}){
        this.catalogsService = catalogsService;
        this.loggerManager = loggerManager;
    }
    
    getEstablishmentCategories = (req,res,next)=>{
        try{
            const establishmentCategories = this.catalogsService.getEstablishmentCategories();
            return res.status(200).json(establishmentCategories);
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting establishment categories', error);
            next(error);
        }
    }
}

export default CatalogsController;         
