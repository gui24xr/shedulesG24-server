import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import passport from './config/passport.js'
import { router as pdfRouter } from './api/test/createpdf.js'
import { router as authRouter } from './api/auth/routes.js'
import { router as companiesRouter } from './api/companies/companies.routes.js'
import { router as shedulesRouter } from './api/shedules/routes.js'

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
console.log("Registrando authRouter en /api/auth:", authRouter.stack.length, "rutas");

   