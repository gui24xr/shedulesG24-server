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

    getOwnerEstablishments = async(ownerId)=>{
        try{
            const ownerEstablishments = await this.establishmentsRepository.find({ownerId:ownerId})
            return ownerEstablishments
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting owner establishments', error);
            throw error;
        }
    }

    getOwnerEstablishmentById = async(ownerId,establishmentId)=>{
        try{
            const foundedEstablishment = await this.establishmentsRepository.findOne({
                _id:establishmentId,
                ownerId:ownerId
            })

            console.log('foundedEstablishment',foundedEstablishment)
            console.log('ownerId ingresado',ownerId)


            if(!foundedEstablishment) throw new Error('Establecimiento no encontrado o no existe...');
            if(foundedEstablishment.ownerId.toString() !== ownerId) throw new Error('No tenes permisos para acceder a este establecimiento');
            return foundedEstablishment
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting owner establishment by id', error);
            throw error;
        }
    }
}