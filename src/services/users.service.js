function createCompanyCode() {
    const letters = Array.from({ length: 3 }, () =>
      String.fromCharCode(65 + Math.floor(Math.random() * 26)) // A-Z
    ).join('');
    const numbers = String(Math.floor(Math.random() * 1000)).padStart(3, '0'); // 000–999
    return `${letters}${numbers}`;
  }

  
export default class UsersService{
    constructor({usersRepository, companiesRepository,ownersRepository,userSchema, companySchema,ownerSchema, dbTransactionsService, loggerManager = null}){
        this.usersRepository = usersRepository;
        this.userSchema = userSchema;
        this.dbTransactionsService = dbTransactionsService;
        this.companiesRepository = companiesRepository;
        this.ownersRepository = ownersRepository;
        this.companySchema = companySchema;
        this.ownerSchema = ownerSchema;
        this.loggerManager = loggerManager;
    }


    findById = async(id)=>{
        try{
            const foundedUser = await this.usersRepository.findOne({_id:id})
             if (!foundedUser) throw new Error('User not found !')
            return {
               id:foundedUser.id.toString(),
               authProvider:foundedUser.authProvider,
               email:foundedUser.email,
               companyId:foundedUser.companyId.toString(),
               role:foundedUser.role,
               enabled:foundedUser.enabled,
               profilePicture:foundedUser.profilePicture,
               enabled:foundedUser.enabled,
               createdAt:foundedUser.createdAt.toISOString(),
               updatedAt:foundedUser.updatedAt.toISOString(),
            };
        }catch(error){
            this.loggerManager && this.loggerManager.error('Error en el servicio de usuarios findById',error);
            throw error;
        }
    }

    findAndAuthUser = async(filter)=>{
        try{
            const validateFilter = this.userSchema.partial().strict().safeParse(filter)         
            if (!validateFilter.success) throw new Error('Datos de filtro inválidos')
            const foundedUser = await this.usersRepository.findOneAndUpdate(filter,{lastLogin:(new Date()).toISOString()},{ new: true })
            if(!foundedUser) return null;
            const foundedOwner = await this.ownersRepository.findOne({userId:foundedUser.id})
            return { 
                tokenData:{
                    userId:foundedUser.id, 
                    role:foundedUser.role,
                    enabled:foundedUser.enabled
                },
                ownerStatus:foundedOwner.status
            }
        }catch(error){
           this.loggerManager && this.loggerManager.error('Error en el servicio de usuarios findAndAuthUser',error);
            throw error;
        }
    }

    createUserOwnerAndHisCompany = async(userData)=>{
        const session = await this.dbTransactionsService.startSession();
        try{
        
            const validateUserData = this.userSchema.pick({
                email:true,
                authProvider:true,
            }).partial().strict().safeParse(userData)

            if (!validateUserData.success) throw new Error('Datos de usuario inválidos')
   
            session.startTransaction();
            const [newCompany] = await this.companiesRepository.create([{ companyCode:createCompanyCode(), email:userData.email}], {session})
            const [newUser] = await this.usersRepository.create([{...userData, role:'owner', companyId:newCompany.id, enabled:true, lastLogin:(new Date()).toISOString()}],{session})
            const [newOwner] = await this.ownersRepository.create([{
                email:newUser.email, 
                companyId:newCompany.id, 
                userId:newUser.id,
                status:'pendingData',
            }],{session})
            await session.commitTransaction();
           
            return { 
                tokenData:{
                    userId:newUser.id, 
                    role:newUser.role,
                    enabled:newUser.enabled
                },
                ownerStatus:newOwner.status
            }
                    
                
            
        }catch(error){
            await session.abortTransaction();
            this.loggerManager && this.loggerManager.error('Error en el servicio de usuarios createOwner',error);
            throw error;
        } finally{
            await session.endSession();
        }
    }
}