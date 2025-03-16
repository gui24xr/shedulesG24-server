import express from 'express'
import { verifyAuth0Token, getUserDataFromAuth0Token } from './utils/getUserDataFromAuth0Token.js'
import { authUsersControllers } from './authUsers.controllers.js'


export const authUsersRouter = express.Router()





authUsersRouter.post('/login-admin',verifyAuth0Token, getUserDataFromAuth0Token,authUsersControllers.loginAsAdmin)


