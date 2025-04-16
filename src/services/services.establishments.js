export default class EstablishmentsService{
    constructor({establishmentsRepository,branchesRepository,establishmentSchema,branchSchema,loggerManager=null}){
        this.establishmentsRepository = establishmentsRepository;
        this.branchesRepository = branchesRepository;
        this.establishmentSchema = establishmentSchema;
        this.branchSchema = branchSchema;
        this.loggerManager = loggerManager;
        
    }
    
    createBasicEstablishment = async(basicEstablishmentData)=>{
        try{
                      //const validateEstablishmentData = this.establishmentSchema.pick({establishmentCode:true,email:true}).safeParse(establishmentData)
            //if(!validateEstablishmentData.success) throw new Error('Datos del establecimiento inválidos en la creacion basica.');
            console.log('basicEstablishmentData',basicEstablishmentData)
            const newEstablishment = await this.establishmentsRepository.create(basicEstablishmentData);
            if(!newEstablishment) throw new Error('Error al crear el establecimiento');
            return newEstablishment;
        }catch(error){
            this.loggerManager && this.loggerManager.error("Error creating establishment", error);
            throw error;
        }
    }
}