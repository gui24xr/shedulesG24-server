export default class EstablishmentsService{
    constructor(establishmentsRepository,establishmentSchema,logger){
        this.establishmentsRepository = establishmentsRepository;
        this.establishmentSchema = establishmentSchema;
        this.logger = logger || console;
    }
    
    createEstablishment = async(establishmentData)=>{
        try{
            console.log('establishmentData',establishmentData)
            //const validateEstablishmentData = this.establishmentSchema.pick({establishmentCode:true,email:true}).safeParse(establishmentData)
            //if(!validateEstablishmentData.success) throw new Error('Datos del establecimiento inválidos en la creacion basica.');
            const newEstablishment = new this.establishmentsRepository(establishmentData);
            await newEstablishment.save();
            return newEstablishment;
        }catch(error){
            this.logger.error("Error creating establishment", error);
            throw error;
        }
    }
}