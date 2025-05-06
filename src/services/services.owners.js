export default class OwnersService {
    constructor({ownersRepository, establishmentsRepository, profilesRepository, ownerSchema, profileSchema, dbTransactionsService, loggerManager = null}) {
        this.ownersRepository = ownersRepository;
        this.establishmentsRepository = establishmentsRepository;
        this.profilesRepository = profilesRepository;
        this.ownerSchema = ownerSchema;
        this.profileSchema = profileSchema;
        this.dbTransactionsService = dbTransactionsService;
        this.loggerManager = loggerManager;
    }


    createOwner = async (ownerData,profileData) => {
        const session = await this.dbTransactionsService.startSession();
        try{

         //Aca valido que no venga basura.
            await session.startTransaction();
            const [newOwner] = await this.ownersRepository.create([ownerData],{session})
            if (!newOwner) throw new Error('Problemas al crear el owner...')
            await this.profilesRepository.create([{ownerId:newOwner.id,email:ownerData.email,...profileData}],{session})
            await session.commitTransaction();
            return await this.findAndAuthOwner(newOwner.email)
        }catch(error){
            await session.abortTransaction();
            this.loggerManager && this.loggerManager.error('Error creating/updating owner', error);
            throw error;
        }finally{
            await session.endSession();
        }
    }

    findAndAuthOwner = async(ownerEmail ) => {
        try{
            const foundedOwner = await this.ownersRepository.findOneAndUpdate(
                { email:ownerEmail},
                { lastLogin:(new Date()).toISOString()},
                { new: true}).populate('profile','establishments')

            if(!foundedOwner) return null

            return {
                id:foundedOwner.id,
                email:foundedOwner.email,
                authProvider:foundedOwner.authProvider,
                status:foundedOwner.status,
                lastLogin:foundedOwner.lastLogin,
                createdAt:foundedOwner.createdAt.toISOString(),
                updatedAt:foundedOwner.updatedAt.toISOString(),
                
            }
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error creating/updating owner', error);
            throw error;
        }
    }

    getOwnerById = async(ownerId) => {
        try{
            console.log('id del owner ya adentro del servicio: ', ownerId)
            const foundedOwner = await this.ownersRepository.findOne({_id:ownerId}).populate('profile');
            if(!foundedOwner) throw new Error('Propietario no encontrado') 
                //Solo falta transformar la informacion que voy a dar al cliente.
            return {
                id:foundedOwner.id,
                email:foundedOwner.email,
                authProvider:foundedOwner.authProvider,
                status:foundedOwner.status,
                enabled:foundedOwner.enabled,
                lastLogin:foundedOwner.lastLogin,
                createdAt:foundedOwner.createdAt.toISOString(),
                updatedAt:foundedOwner.updatedAt.toISOString(),
                profile:foundedOwner.profile,
            }
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error finding owner', error);
            throw error;
        }
    }



    getOwnerProfileById = async(ownerId) => {
        try{
            
            const foundedOwnerProfile = await this.profilesRepository.findOne({ownerId:ownerId});
            if(!foundedOwnerProfile) throw new Error('Owner profile not found or not exists...') 
                //Solo falta transformar la informacion que voy a dar al cliente.
            return {
                email:foundedOwnerProfile.email,
                firstName:foundedOwnerProfile.firstName,
                lastName:foundedOwnerProfile.lastName,
                phoneNumber:foundedOwnerProfile.phoneNumber,
                profilePicture:foundedOwnerProfile.profilePicture,
                status:foundedOwnerProfile.status,
                updatedAt:foundedOwnerProfile.updatedAt.toISOString(),
            }
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error finding owner profile', error);
            throw error;
        }
    }

    updateOwnerProfile = async(ownerId, updateOwnerData) => {
        try{
            //Actualmente completar el perfil lo activara pero mas
            //aca validar data que viene desde afuera. Solo aceptare firstName,lastName, phoneNumber.
            //Si pasa correctamente la valiacion puedo pasar status a active.
           
            console.log('updateOwnerData:',updateOwnerData)
            const updatedOwnerProfile = await this.profilesRepository.findOneAndUpdate(
                {ownerId:ownerId},
                {...updateOwnerData},
                {new:true})
            if(!updatedOwnerProfile) throw new Error('Error updating Profile...')

             return {
                email:updatedOwnerProfile.email,
                firstName:updatedOwnerProfile.firstName,
                lastName:updatedOwnerProfile.lastName,
                phoneNumber:updatedOwnerProfile.phoneNumber,
                profilePicture:updatedOwnerProfile.profilePicture,
                status:updatedOwnerProfile.status,
                updatedAt:updatedOwnerProfile.updatedAt.toISOString(),
            }   
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error updating owner', error);
            throw error;
        }
    }
}


