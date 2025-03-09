

/*
import { SlotsManager } from "./slotsmanager.js";
import { ShedulesRepository } from "./shedules.repository.js";


const shedulesRepository = new ShedulesRepository()
export class ShedulesService{

    async createShedule(){
        try{
            const newShedule = await shedulesRepository.createEmptyShedule()
            return newShedule
        }catch(error){
            throw error
        }
    }

    async getShedules(){
        try{
            const shedules = await shedulesRepository.getShedules()
            const mappedShedulesInfo = shedules.map( sheduleItem => ({
                ...sheduleItem,
                slots: SlotsManager.sortSlotsGroup(sheduleItem.slots)
            }))
            return mappedShedulesInfo
        }catch(error){
            throw error
        }
    }

    async getSheduleById(id){
        try{
            const foundShedule = await shedulesRepository.getSheduleById(id)
            return {...foundShedule, slots: SlotsManager.sortSlotsGroup(foundShedule.slots)}
        }catch(error){
            throw error
        }
    }


    async InsertSlotToShedule({sheduleId,startDateTime,durationInMinutes}){
        try{
            const sheduleSlotsList = await shedulesRepository.getSheduleSlots(sheduleId)
            const newSlotItem = SlotsManager.createSlotItem(startDateTime,durationInMinutes)



            SlotsManager.checkSlotsConflict(sheduleSlotsList,newSlotItem)
            await shedulesRepository.insertSlotsGroupToShedule(sheduleId,[newSlotItem])
            return  newSlotItem 
        }catch(error){
            throw error
        }
    }

    async InsertSlotsGroupToShedule({sheduleId,startDateTime,durationInMinutes,betweenInervalInMinutes,slotsQuantity}){
        try{    
            const sheduleSlotsList = await shedulesRepository.getSheduleSlots(sheduleId)

            const newSlotsGroup = SlotsManager.createSlotsGroupArray({startDateTime,durationInMinutes,betweenInervalInMinutes,slotsQuantity})
            
            newSlotsGroup.forEach(item =>{
                SlotsManager.checkSlotsConflict(sheduleSlotsList,item) 
            })

            await shedulesRepository.insertSlotsGroupToShedule(sheduleId,newSlotsGroup)

            return SlotsManager.sortSlotsGroup(newSlotsGroup)
        }catch(error){
            throw error
        }
    }


    async insertAdditionalSlot({sheduleId,startDateTime}){
        try{
           //creo un sobre turno con array de reservas vacio
           //Pero antes copruebo que no haya otros sobre turnos a esa hora?
        }catch(error){
            throw error
        }
    }

    async addCustomerToWaitingList({sheduleId,customeId,possibleDatesArray}){
        try{
            
         }catch(error){
             throw error
         }
    }

    async addBookingToSlot({sheduleId,slotId,bookingId}){
        try{
            //Busco el slot
            //le pido al booking service que cree una booking pendiente
        }catch(error){
            throw error
        }
    }

}

*/