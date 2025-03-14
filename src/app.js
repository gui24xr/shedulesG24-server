import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from './config/passport.js'
import {z} from 'zod'
import {
  pdfRouter,
    authRouter,
    
    bookingsDevRouter,
    providedServicesDevRouter,
    shedulesDevRouter,
    customersDevRouter,
    companiesDevRouter,
    companyBranchsDevRouter,
    notificationsConfigsDevRouter,
    providersDevRouter,
    usersDevRouter,
    waitingListsDevRouter,
    sheduleSlotsDevRouter,
} from './api/routes.index.js'



export const app = express()

app.use(morgan("dev"))
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.SERVER_COOKIES_SIGN))
app.use(cors({
    origin: "http://localhost:5173", 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'], 
    credentials: true, 
  }))
app.use(passport.initialize())


app.use('/api/docs', pdfRouter)
app.use('/api/auth', authRouter)
app.use('/api/dev/companies', companiesDevRouter)
app.use('/api/dev/shedules', shedulesDevRouter)
app.use('/api/dev/providedservices', providedServicesDevRouter)
app.use('/api/dev/customers', customersDevRouter)
app.use('/api/dev/bookings', bookingsDevRouter)
app.use('/api/dev/branchs', companyBranchsDevRouter)
app.use('/api/dev/notificationsconfigs', notificationsConfigsDevRouter)
app.use('/api/dev/providers', providersDevRouter)
app.use('/api/dev/users', usersDevRouter)
app.use('/api/dev/waitinglists', waitingListsDevRouter)
app.use('/api/dev/sheduleslots',sheduleSlotsDevRouter)


  
app.use((error, req, res, next) => {
  console.error("Middlewares de errores: ", error); 
  if (error instanceof z.ZodError)
    return res.status(400).json({
      message: "Error de validación",
      errors: error.errors, 
    })
  return res.status(500).json({error:error.message})
})