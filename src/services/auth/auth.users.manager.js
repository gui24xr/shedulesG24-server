import { UsersManager } from "../../manager/users.manager.js"


const usersManager = new UsersManager()

export const authUsersManager = {

    handleUserAuth0Admin: async (auth0UserData) => {
    try {
    
       const authUser = await usersManager.createOrAuthenticateAuth0User({
            email: auth0UserData.email,
            userName: auth0UserData.userName,
            firstName: auth0UserData.firstName,
            lastName: auth0UserData.lastName,
            role: 'admin'
       })


      
       return authUser
    } catch (error) {
        console.error(error);
        throw error;
    }
},

    



    
}