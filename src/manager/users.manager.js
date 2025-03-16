import { usersRepository } from "../repositories/users.repository.js"
import { logger } from "../config/logger.config.js"
import bcrypt from 'bcrypt'
import { userSchema } from "../schemas/users.schemas.js"

export class UsersManager {
  
    async getUserById(id){
      try{
        const foundUser = await usersRepository.getById(id)
        if (!foundUser) throw new Error ('Usuario no existe...')
          return foundUser
        //return new UserDTO(foundUser)
      }catch(error){
        throw error
      }
    }
    

    async getUserByEmail(email){
      try{
        const foundUser = await usersRepository.getUserByEmail(email)
        if (!foundUser) throw new Error ('Usuario no existe...')
        return foundUser
        //return new UserDTO(foundUser)
      }catch(error){
        throw error
      }
    }

    existsUserByEmail(email){
      try{
        return usersRepository.existsUserByEmail(email)
      }catch(error){
        throw error
      }
    }

    authenticateLocalUser = async (email, password) => {
      try{
        const foundUser = await usersRepository.getUserByEmail(email)
        if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
            throw new Error("Credenciales inválidas");
        }
        return {
            id: foundUser.id,
            role: foundUser.role,
            enabled: foundUser.enabled
        };
      }catch(error){
        logger.info(error)
        throw error
      }
    
  };



    async createLocalUser(newUserData){
      try{
        //validar
        const existsUser = await usersRepository.existsUserByEmail(newUserData.email)
        if (existsUser) throw new Error('User ya existe...')
         const createdUser = await usersRepository.create(({
            authProvider: 'local',
            email: newUserData.email,
            userName: newUserData.userName,
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
            role: newUserData.role,
            password: await bcrypt.hash(newUserData.password, 12,),
            enabled: true,
        }))
        //aca iria dto para proteger password
        return createdUser
      }catch(error){
        throw error
      }
    }

    async createOrAuthenticateAuth0User(auth0UserData){    
      try{
        const existsUser = await usersRepository.existsUserByEmail(auth0UserData.email)
        if (!existsUser){
            const createdUser = await usersRepository.create({
                authProvider: 'auth0',
                email: auth0UserData.email,
                userName: auth0UserData.userName,
                firstName: auth0UserData.firstName,
                lastName: auth0UserData.lastName,
                role: auth0UserData.role,
                enabled: true,
            })
            return createdUser
        }
        const authenticateUser = await usersRepository.getUserByEmail(auth0UserData.email)
        return authenticateUser
      }catch(error){
        throw error
      }
    }



}  