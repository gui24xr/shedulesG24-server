export default class OwnersService {
    constructor({ownersRepository, companiesRepository: establishmentsRepository, ownerSchema, logger}) {
        this.ownersRepository = ownersRepository;
        this.establishmentsRepository = establishmentsRepository;
        this.ownerSchema = ownerSchema;
        this.logger = logger;
    }

    findOrCreateAndSetLastLoginToOwner = async({auth0UserEmail,authProvider}) =>{
        try{
            const foundedOwner = await this.ownersRepository.findOneAndUpdate(
                {email:auth0UserEmail},
                { authProvider:authProvider, email:auth0UserEmail, lastLogin:(new Date()).toISOString()},
                { new: true, upsert:true, setDefaultsOnInsert:true })
           
            return {
                id:foundedOwner.id,
                email:foundedOwner.email,
                authProvider:foundedOwner.authProvider,
                status:foundedOwner.status,
                enabled:foundedOwner.enabled,
                firstName:foundedOwner.firstName,
                lastName:foundedOwner.lastName,
                phoneNumber:foundedOwner.phoneNumber,
                profilePicture:foundedOwner.profilePicture,
                lastLogin:foundedOwner.lastLogin,
                createdAt:foundedOwner.createdAt.toISOString(),
                updatedAt:foundedOwner.updatedAt.toISOString(),
                                }
        }catch(error){
            this.logger.error('Error creating/updating owner', error);
            throw error;
        }
    }

    //------------------------------------------------------------------------------

    getOwnerById = async(ownerId) => {
        try{
            console.log('id del owner ya adentro del servicio: ', ownerId)
            const foundedOwner = await this.ownersRepository.findOne({_id:ownerId})
            if(!foundedOwner) throw new Error('Propietario no encontrado') 
                //Solo falta transformar la informacion que voy a dar al cliente.
            return {
                id:foundedOwner.id,
                email:foundedOwner.email,
                authProvider:foundedOwner.authProvider,
                status:foundedOwner.status,
                enabled:foundedOwner.enabled,
                firstName:foundedOwner.firstName,
                lastName:foundedOwner.lastName,
                phoneNumber:foundedOwner.phoneNumber,
                profilePicture:foundedOwner.profilePicture,
                lastLogin:foundedOwner.lastLogin,
                createdAt:foundedOwner.createdAt.toISOString(),
                updatedAt:foundedOwner.updatedAt.toISOString(),
            }
        }catch(error){
            this.logger.error('Error finding owner', error);
            throw error;
        }
    }


    updateOwnerProfile = async(ownerId, updateOwnerData) => {
        try{
            //Actualmente completar el perfil lo activara pero mas
            //aca validar data que viene desde afuera. Solo aceptare firstName,lastName, phoneNumber.
            //Si pasa correctamente la valiacion puedo pasar status a active.
            console.log('updteOwnerData en servicio: ',ownerId, updateOwnerData)
            const updatedOwner = await this.ownersRepository.findOneAndUpdate(
                {_id:ownerId}, 
                {...updateOwnerData, status:'active'},
                {new:true})
            if(!updatedOwner) throw new Error('Owner not found')
            return {
                id:updatedOwner.id,
                email:updatedOwner.email,
                authProvider:updatedOwner.authProvider,
                status:updatedOwner.status,
                enabled:updatedOwner.enabled,
                firstName:updatedOwner.firstName,
                lastName:updatedOwner.lastName,
                phoneNumber:updatedOwner.phoneNumber,
                profilePicture:updatedOwner.profilePicture,
                lastLogin:updatedOwner.lastLogin,
                createdAt:updatedOwner.createdAt.toISOString(),
                updatedAt:updatedOwner.updatedAt.toISOString(),
            }
        }catch(error){
            this.logger.error('Error updating owner', error);
            throw error;
        }
    }
}


