export default class EstablishmentsService{
    constructor({establishmentsRepository,establishmentSchema,employeesRepository,employeeSchema,ownersRepository,locationsRepository,branchesRepository,establishmentsConfigRepository,dbTransactionsService=null,loggerManager=null}){
        this.establishmentsRepository = establishmentsRepository;
        this.establishmentSchema = establishmentSchema;
        this.ownersRepository = ownersRepository;
        this.employeesRepository = employeesRepository;
        this.employeeSchema = employeeSchema;
        this.locationsRepository = locationsRepository;
        this.branchesRepository = branchesRepository;
        this.establishmentsConfigRepository = establishmentsConfigRepository;
        this.dbTransactionsService = dbTransactionsService;
        this.loggerManager = loggerManager;
        
    }


  
    
    createEstablishment = async({ownerId,payload})=>{
        const session = await this.dbTransactionsService.startSession();
        try{
            this.loggerManager && this.loggerManager.debug('basicEstablishmentData','ownerId: ',ownerId,'payload: ',payload)

           //Aca iran las validaciones tanto de ownerId como de payload
            /*
             payload = {
                establishmentData: {
                    name: 'valor',
                    description: 'valor',
                    logoUrl: 'valor',
                    contactPhones: ['tel1','tel2'...'teln],
                    contactEmails: ['email1','email2'...'emailn],
                }
                configData: {
                    businessCategory: 'valor',
                    attendanceMode: 'valor',
                    schedulingConfigType: 'valor',
                }
            */
            const establishmentData  = {
                ownerId: ownerId,
                establishmentCode: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                status: 'pendingData',
                ...payload.establishmentData,
            }
            console.log('ESTABLISHMENT DATA: ',establishmentData)
            session.startTransaction();
           
            const [newEstablishment] = await this.establishmentsRepository.create([{...establishmentData}] ,{session});
            if(!newEstablishment) throw new Error('Error al crear el establecimiento');

            const configData = payload.configData 
            ? 
            { establishmentId: newEstablishment.id,...payload.configData } 
            : 
            {establishmentId: newEstablishment.id}
              
            console.log('CONFIG DATA: ',configData)
              
            const [newEstablishmentConfig] = await this.establishmentsConfigRepository.create([{...configData}],{session});
            if(!newEstablishmentConfig) throw new Error('Error al crear la configuracion del establecimiento');

            await session.commitTransaction();
            console.log('Establecimiento creado: ',newEstablishment)
            return await this.getEstablishmentById(newEstablishment.id)
        }catch(error){
            session.abortTransaction();
            this.loggerManager && this.loggerManager.error("Error creating establishment", error);
            throw error;
        }finally{
            session.endSession();
        }

    }

    getEstablishmentById = async(establishmentId)=>{
        try{
            console.log('ESTABLISHMENT ID: ',establishmentId)
            const foundedEstablishment = await this.establishmentsRepository.findOne({_id:establishmentId}).populate('establishmentConfig')
            if(!foundedEstablishment) throw new Error('Establecimiento no encontrado o no existe...');
            return this.#getEstablishmentDTO(foundedEstablishment)
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting establishment by id', error);
            throw error;
        }
    }

    #getEstablishmentDTO = (establishment)=>{
        const dto = {
            id:establishment.id,
            establishmentCode:establishment.establishmentCode,  
            status:establishment.status,
            name:establishment.name,
            description:establishment.description,
            logoUrl:establishment.logoUrl,
            contactPhones:establishment.contactPhones,
            contactEmails:establishment.contactEmails,
            establishmentConfig:{
                businessCategory:establishment.establishmentConfig.businessCategory,
                attendanceMode:establishment.establishmentConfig.attendanceMode,
                schedulingConfigType:establishment.establishmentConfig.schedulingConfigType,        
                //ACa despues ver como devolver el notifications profileIInfo
                displayLocations:establishment.establishmentConfig.displayLocations,
                status:{
                    status:establishment.establishmentConfig.status,
                    missingConfigs:establishment.establishmentConfig.missingConfigs,
                },          
            },          
            createdAt:establishment.createdAt,
            updatedAt:establishment.updatedAt,
        }

        console.log('DTO ESTABLECIMIENTO: ',dto)
        return dto;
    }


    


    getOwnerEstablishments = async(ownerId)=>{
        try{
            const ownerEstablishments = await this.establishmentsRepository.find({ownerId:ownerId})
            console.log('Establecimientos del owner: ',ownerEstablishments)
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
            if(!foundedEstablishment) throw new Error('Establecimiento no encontrado o no existe...');
            if(foundedEstablishment.ownerId.toString() !== ownerId) throw new Error('No tenes permisos para acceder a este establecimiento');
            
            console.log('Establecimiento encontrado: ',foundedEstablishment)
            return foundedEstablishment
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting owner establishment by id', error);
            throw error;
        }
    }


    getEmployeesEstablishment = async({ownerId,establishmentId})=>{
        try{
            const foundedEstablishment = await this.establishmentsRepository.findOne({_id:establishmentId,ownerId:ownerId}).populate('employees')
            if(!foundedEstablishment) throw new Error('Establecimiento no encontrado o no existe o recurso no autorizado...');
            return foundedEstablishment.employees
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error getting employees establishment', error);
            throw error;
        }
    }
}