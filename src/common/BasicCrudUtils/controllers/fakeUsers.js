import fs from 'fs/promises'
import bcrypt from 'bcrypt'

const FAKE_USERS_DB_PATH_FILE = './fakeusers.json';

const defaultFakeUsers = [
        {
        id: 1,
        email: "fakeuser1@example.com",
        password: bcrypt.hashSync("123456",10),
        role: "admin"
        },
    {
        id: 2,
        email: "fakeuser2@example.com",
        password: bcrypt.hashSync("123456",10),
        role: "admin"
    },
    {   
        id: 3,
        email: "fakeuser3@example.com",
        password: bcrypt.hashSync("123456",10),
        role: "admin"
    }
  ]


  const createFileIfNotExist = async () => {
    try {
        await fs.stat(FAKE_USERS_DB_PATH_FILE); // Si el archivo existe, no lanza error
    } catch {
        await fs.writeFile(FAKE_USERS_DB_PATH_FILE, JSON.stringify(defaultFakeUsers, null, 2))
   }
};

const getFakeUsersFromDB = async() => {
    try{
        await createFileIfNotExist()
        const usersList = JSON.parse(await fs.readFile(FAKE_USERS_DB_PATH_FILE, 'utf8'))
        console.log('getFakeUsersFromDB2', usersList)
        return usersList
       
    }catch(error){
        throw error
    }
}

const registerFakeUsers = async (req,res,next) => {
    try{
        const {email,password,role} = req.body
        validateUserRegisterData({email,password,role})
        const usersList = await getFakeUsersFromDB()
        const userExists = usersList.find(user => user.email === email)
        if (userExists) return res.status(400).json({message: 'User already exists'})
        const newUser = {
            id:usersList.length + 1,
            email:email,
            password:bcrypt.hashSync(password,10),
            role:role
        }
        usersList.push(newUser)
        await fs.writeFile(FAKE_USERS_DB_PATH_FILE, JSON.stringify(usersList, null, 2))
        delete newUser.password
        res.status(201).json({message: 'User created successfully',user:newUser})
    }catch(error){
        next(error)
    }
}
       
const loginFakeUser = async (req,res,next) => {
        try{
            const {email,password} = req.body
            validateUserLoginData({email,password})
            const usersList = await getFakeUsersFromDB()
            const user = usersList.find(user => user.email === email)
            if (!user) return res.status(400).json({message: 'User not found'}) 
            const isPasswordValid = bcrypt.compareSync(password,user.password)
            if (!isPasswordValid) return res.status(400).json({message: 'Invalid password'})
            delete user.password
            res.status(200).json({message: 'User logged in successfully',user:user})
        }catch(error){
            next(error)
        }
    }
    


    
export { 
    registerFakeUsers  , 
    loginFakeUser
}

// Función de validación

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const validRoles = ['user', 'admin'];
const passwordRegex = /^(?=.*[A-Z])[A-Za-z\d]{8,}$/;

const validateUserLoginData = (data) => {
    try{
       if (!data.email || !data.password) throw new Error('Email and password are required')
       if (!emailRegex.test(data.email)) throw new Error('Invalid email')
    }catch(error){
        throw error
    }
    
}

const validateUserRegisterData = (data) => {
    try{
        if (!data.email || !data.password || !data.role) throw new Error('Email, password and role are required')
        if (!emailRegex.test(data.email)) throw new Error('Invalid email')
        if (!validRoles.includes(data.role)) throw new Error('Invalid role')
        if (!passwordRegex.test(data.password)) throw new Error('Invalid password, must be at least 8 characters long and contain at least one uppercase letter.')                
    }catch(error){
        throw error
    }
}
