import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from './config/passport.js'
import { router as pdfRouter } from './api/test/createpdf.js'
import { router as authRouter } from './api/auth/routes.js'
import { router as companiesRouter } from './api/companies/companies.routes.js'
import { router as offeringsRouter } from './api/offerings/routes.js'
import { router as shedulesRouter } from './api/shedules/routes.js'
import { router as customersRouter } from './api/customers/customers.routes.js'
import { router as bookingsRouter } from './api/bookings/bookings.routes.js'
import {z} from 'zod'

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
app.use('/api/offerings', offeringsRouter)
app.use('/api/customers', customersRouter)
app.use('/api/bookings', bookingsRouter)


  
app.use((error, req, res, next) => {
  console.error("Middlewares de errores: ", error); // Aquí puedes loguear el error

  if (error instanceof z.ZodError)
    return res.status(400).json({
      message: "Error de validación",
      errors: error.errors, // Detalles sobre qué campo falló
    })

  return res.status(500).json({error:error.message})
})