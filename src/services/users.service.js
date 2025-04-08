import { logger } from '../config/logger.config.js'



export default class UsersService{
    constructor(usersRepository, userSchema){
        this.usersRepository = usersRepository;
        this.userSchema = userSchema;
    }

    findOneAndUpdate = async(filter,updateData)=>{
        try{
         
            const validateFilter = this.userSchema.partial().strict().safeParse(filter)
            const validateUpdateData = this.userSchema.pick({
                authProvider:true,
                companyId:true,
                role:true,
                userName:true,
                password:true,
                profilePicture:true,
                enabled:true,
                lastLogin:true,
            }).partial().strict().safeParse(updateData)
            
            console.log('validateUpdateData',validateUpdateData, updateData)
            if (!validateFilter.success) throw new Error('Datos de filtro inválidos')
            if (!validateUpdateData.success) throw new Error('Datos de actualización inválidos')
                    
           return await this.usersRepository.findOneAndUpdate(filter,updateData,{ new: true })
        }catch(error){
            logger.error('Error en el servicio de usuarios findOneAndUpdate',error);
            throw error;
        }
    }

    findAndAuthUser = async(filter)=>{
        try{
            const validateFilter = this.userSchema.partial().strict().safeParse(filter)         
            if (!validateFilter.success) throw new Error('Datos de filtro inválidos')
           return await this.usersRepository.findOneAndUpdate(filter,{lastLogin:(new Date()).toISOString()},{ new: true })
        }catch(error){
            logger.error('Error en el servicio de usuarios findAndAuthUser',error);
            throw error;
        }
    }

    createUserOwnerAndHisCompany = async(userData)=>{
        try{
            const validateUserData = this.userSchema.pick({
                email:true,
                authProvider:true,
            }).partial().strict().safeParse(userData)

            if (!validateUserData.success) throw new Error('Datos de usuario inválidos')
            return await this.usersRepository.create({...userData, role:'owner', enabled:true, lastLogin:(new Date()).toISOString()})
        }catch(error){
            logger.error('Error en el servicio de usuarios createOwner',error);
            throw error;
        }
    }
}