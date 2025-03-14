import { MongooseRepository } from '../../common/mongooseRepository.js'
import { User } from '../../models/index.js'
import { userSchema } from './users.schemas.js'


class UsersRepository extends MongooseRepository{
    constructor({ model, validateSchema, populateFieldsArray }) {
        super({ model, validateSchema, populateFieldsArray })
    }

    async getUserByEmail(email) {
        try{
            const founded = await this.model.findOne({email:email}).exec()
            if (!founded) throw new Error(`user con email ${email} no encontrado...`) 
            return founded.toObject({ virtuals: true });  
        }catch(error){
            throw error
        }
    }

    async existsUserByEmail(email) {
        try{
            const founded = await this.model.findOne({email:email}).exec()
            if (!founded) return null
            return true //founded.toObject({ virtuals: true });  
        }catch(error){
            throw error
        }
    }
}

export const usersRepository = new UsersRepository({
    model: User,
    validateSchema: userSchema,
    populateFieldsArray: []
})


