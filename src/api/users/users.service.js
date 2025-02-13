import { Company } from "../../database/models/models.company.js";
import { User } from "../../database/models/models.user.js";
import { UserDTO } from "./users.dto.js";


export class UsersService {
  async handleUserAuth({ email, userName, firstName, lastName, profilePicture }) {
    try {
        const newUserData =  { email, userName, firstName, lastName, profilePicture }
        const foundOrCreatedUser = await User.findOneAndUpdate({email:email},{ $setOnInsert: {...newUserData}, $set: {lastLogin: new Date()}}, {
            upsert: true, // Crea el documento si no existe
            new: true, // Devuelve el documento actualizado o creado
          }).lean()

        return new UserDTO(foundOrCreatedUser)
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getUserById(id){
    try{
      const foundUser = await User.findOne({_id:id}).lean()
      if (!foundUser) throw new Error ('Usuario no existe...')
      return new UserDTO(foundUser)
    }catch(error){
      throw error
    }
  }

  async addCompany({userId,companyId}) {
    try{
      const foundUser = await User.findOne({_id:userId})
      console.log('Found user en add company: ', foundUser)
      if (!foundUser) throw new Error('User no existe')
        foundUser.companies.push(companyId)
        return foundUser.save()
    }catch(error){
        throw error
    }
  }

  
}
