export class UserDTO{
    constructor(user){
        this.id = user._id.toString()
        this.email = user.email
        this.firstName = user.firstName,
        this.lastName = user.lastName,
        this.userName = user.userName,
        this.profilePicture = user.profilePicture
        this.lastLogin = user.lastLogin
        this.enabled = user.enabled
        this.hasCompanyData = user.companies.length > 0  ? true : false
    }
}

