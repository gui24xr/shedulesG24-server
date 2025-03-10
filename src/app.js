import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from './config/passport.js'
import {z} from 'zod'
import {
  pdfRouter,
  authRouter,
  companiesRouter,
  providedServiceRouter,
  shedulesRouter,
  customersRouter,
  bookingsRouter,
  companyBranchsRouter,
  notificationsConfigsRouter,
  providersRouters,
  usersRouters,
  waitingListsRouter,
  sheduleSlotsRouter

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
app.use('/api/companies', companiesRouter)
app.use('/api/shedules', shedulesRouter)
app.use('/api/providedservices', providedServiceRouter)
app.use('/api/customers', customersRouter)
app.use('/api/bookings', bookingsRouter)
app.use('/api/branchs', companyBranchsRouter)
app.use('/api/notificationsconfigs', notificationsConfigsRouter)
app.use('/api/providers', providersRouters)
app.use('/api/users', usersRouters)
app.use('/api/waitinglists', waitingListsRouter)
app.use('/api/sheduleslots',sheduleSlotsRouter)


  
app.use((error, req, res, next) => {
  console.error("Middlewares de errores: ", error); // Aquí puedes loguear el error

  if (error instanceof z.ZodError)
    return res.status(400).json({
      message: "Error de validación",
      errors: error.errors, // Detalles sobre qué campo falló
    })

  return res.status(500).json({error:error.message})
})