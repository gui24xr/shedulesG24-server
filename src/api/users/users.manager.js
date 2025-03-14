import { usersRepository } from "./users.repository.js"
import bcrypt from 'bcrypt'
import { authSchema } from "../auth/schema.js"

export class UsersManager {
    async handleUserAuth({ email, userName, firstName, lastName, profilePicture }) {
      try {
           const newUserData =  { email, userName, firstName, lastName /*profilePicture*/, role:'admin'}
           const updateData = { lastLogin: new Date().toISOString()}
           
           const foundOrCreatedUser = await usersRepository.findOneAndCreateOrUpdate({email:email},newUserData, updateData)
           //const foundOrCreatedUser = await usersRepository.create(newUserData)
    
  
          return foundOrCreatedUser
      } catch (error) {
        console.error(error);
        throw error;
      }
    }
  
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

    async handleDevUserRegister(newUserData){
      try{
        authSchema.createDevSchema.parse(newUserData)
        if(newUserData.devPasswordKey !== process.env.DEVS_SECRET_PASSWORD_KEY) throw new Error("Unrecognized dev key")
          
        const existsUser = await usersRepository.existsUserByEmail(newUserData.email)
        if (existsUser) throw new Error('User ya existe...')

        const createdUser = await usersRepository.create(({
          email: newUserData.email,
          userName: newUserData.userName,
          firstName: newUserData.firstName,
          lastName: newUserData.lastName,
          role: 'dev', 
          password: await bcrypt.hash(newUserData.password, 12,),
          enabled: true
        }))
        return createdUser
      }catch(error){
        throw error
      }
    }

    async handleDevUserLogin(userLoginData){
      try{
        authSchema.loginDevSchema.parse(userLoginData)
        const foundedUser = await usersRepository.getUserByEmail(userLoginData.email)
        if (foundedUser.role !== 'dev') throw new Error('El user no es dev, no esta autorizado a acceder...')
        let isMatchPassword = await bcrypt.compare(userLoginData.password,foundedUser.password)
        if (!isMatchPassword) throw new Error("Password incorrecto...")
        return foundedUser
      }catch(error){
        throw error
      }
    }
}  