/*

import { ShedulesService } from "./shedules.manager.js"

const shedulesService = new ShedulesService()

export const shedulesControllers = {
    createShedule: async (req,res,next) => {
        try{
            const createdShedule = await shedulesService.createShedule()
            return res.status(201).json({
                shedule: createdShedule
            })
        }catch(error){
            res.status(500).json({error:error})
        }
    },

    createSlot: async (req,res,next) => {
        try{
            const {sheduleId,startDateTime,durationInMinutes} = req.body
            const createdSlot = await shedulesService.InsertSlotToShedule({sheduleId,startDateTime,durationInMinutes})
            return res.status(201).json({
                message: 'Slot agregado exitosamente a la agenda....',
                shedule: sheduleId,
                slot: createdSlot
            })
        }catch(error){
            return res.status(500).json({error:error.message})
        }
    },

    createSlotsGroup: async (req,res,next) => {
        try{
            const {sheduleId,startDateTime,durationInMinutes,betweenInervalInMinutes,slotsQuantity} = req.body
            const createdSlotsGroup = await shedulesService.InsertSlotsGroupToShedule({sheduleId,startDateTime,durationInMinutes,betweenInervalInMinutes,slotsQuantity})
            return res.status(201).json({
                message: 'Slots group creado exitosamente en la agenda...',
                shedule: sheduleId,
                slotsGroup: createdSlotsGroup
            })
        }catch(error){
            return res.status(500).json({error:error.message})
        }
    },

    getShedules: async (req,res,next) => {
        try{
            const {sid:sheduleId} = req.params

            if(sheduleId){
                const foundShedule = await shedulesService.getSheduleById(sheduleId)
                return res.status(201).json({
                shedule: foundShedule
            })
            }
            const foundShedules = await shedulesService.getShedules()
            return res.status(201).json({
                shedules: foundShedules
            })
        }catch(error){
            return res.status(500).json({error:error.message})
        }
    }

}

*/