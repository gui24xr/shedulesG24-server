class CatalogsService{
    constructor({catalogsData,loggerManager=null}){
       this.catalogsData = {...catalogsData};
       this.loggerManager = loggerManager;
    }
    
    getBusinessCategories = () => {
        try{
            return this.catalogsData.businessCategories;
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting establishment categories', error);
            throw error;
        }
    }

    getSchedulingConfigTypeCategories = () => {
        try{
            return this.catalogsData.schedulingConfigType;
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting scheduling config type categories', error);
            throw error;
        }
    }

    getEstablishmentStatus = () => {
        try{
            return this.catalogsData.establishmentStatus;
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting establishment status', error);
            throw error;
        }
    }
}

export default CatalogsService;
