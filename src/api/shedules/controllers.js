import { ShedulesService } from "./service.js"

const shedulesService = new ShedulesService()

export const shedulesControllers = {
    createShedule: async (req,res,next) => {
        try{
            const createdShedule = await shedulesService.createShedule()
            return res.status(201).json({
                shedule: createdShedule
            })
        }catch(error){
            throw error
        }
    },

    createSlot: async (req,res,next) => {
        try{
            const {sheduleId,startDateTime,durationInMinutes} = req.body
            const createdSlot = await shedulesService.addSlot({sheduleId,startDateTime,durationInMinutes})
            return res.status(201).json({
                shedule: createdSlot
            })
        }catch(error){
            return res.status(500).json({error:error})
        }
    },

    createSlotsMany: async (req,res,next) => {
        try{
            const {sheduleId,startDateTime,durationInMinutes,betweenInervalInMinutes,slotsQuantity} = req.body
            const createdSlot = await shedulesService.addSlotsMany({sheduleId,startDateTime,durationInMinutes,betweenInervalInMinutes,slotsQuantity})
            return res.status(201).json({
                slot: createdSlot
            })
        }catch(error){
            return res.status(500).json({error:error})
        }
    },

    getShedules: async (req,res,next) => {
        try{
            const foundShedules = await shedulesService.getShedules()
            return res.status(201).json({
                shedules: foundShedules
            })
        }catch(error){
            throw error
        }
    }

}