class CatalogsService{
    constructor({catalogsData,loggerManager=null}){
       this.catalogsData = {...catalogsData};
       this.loggerManager = loggerManager;
    }
    
    getEstablishmentCategories = () => {
        try{
            return this.catalogsData.establishmentCategories;
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting establishment categories', error);
            throw error;
        }
    }
}

export default CatalogsService;
