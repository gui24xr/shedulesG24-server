import express from 'express'
import { generateAppointmentTicket } from '../../utils/createticketfile.js'

export const router = express.Router()

router.post('/',async (req,res)=>{
    try {
        const {clinic,date,hour,medic,patient} = req.body
        await generateAppointmentTicket({clinic,date,hour,medic,patient})
        res.status(200).json({message: 'Datos recibidos!', payload: req.body})
    } catch (error) {
        console.error(error)
        res.status(500).json(error)
    }
})

