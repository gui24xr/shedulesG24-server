import { UsersManager } from "../users/users.manager.js"
import { authSchema } from "./schema.js"

const usersManager = new UsersManager()

export const authDevManager = {

    registerAsDev: async (newDevData) => {
        try {
            authSchema.createDevSchema.parse(newDevData)
            if (newDevData.devPasswordKey !== process.env.DEVS_SECRET_PASSWORD_KEY) throw new Error("Unrecognized dev key")
            const createdUser = await usersManager.createLocalUser({...newDevData, role: 'dev'})
            return createdUser
        } catch (error) {
            throw error
        }
    },

    handleDevUserLogin: async (userLoginData) => {
        try {
            authSchema.loginDevSchema.parse(userLoginData)
            const foundedUser = await usersManager.authenticateLocalUser(userLoginData.email,userLoginData.password)
            if (foundedUser.role !== 'dev') throw new Error('El user no es dev, no esta autorizado a acceder...')
            return foundedUser
        } catch (error) {
            throw error
        }
    },


   



    
}