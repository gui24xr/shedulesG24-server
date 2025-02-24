import { Shedule } from "../../database/models/models.shedule.js";
import { SlotsManager } from "./slotsmanager.js";
import { ShedulesRepository } from "./repository.js";

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
            return shedules
        }catch(error){
            throw error
        }
    }

    async addSlot({sheduleId,startDateTime,durationInMinutes}){
        try{
            console.log('LLego a addSlot: ', sheduleId,startDateTime,durationInMinutes)
            const foundShedule = await shedulesRepository.getSheduleById(sheduleId)
    
            const newSlotItem = SlotsManager.getSlotItem(startDateTime,durationInMinutes)

            checkScheduleSlotsConflict(foundShedule.slots,newSlotItem)
            await shedulesRepository.addSlotsToShedule(sheduleId,[newSlotItem])
            return foundShedule
        }catch(error){
            console.error(error)
            throw(error)
        }
    }

    async addSlotsMany({sheduleId,startDateTime,durationInMinutes,betweenInervalInMinutes,slotsQuantity}){
        try{    
            const newSlotsArray = SlotsManager.getSlotItemsArray({startDateTime,durationInMinutes,betweenInervalInMinutes,slotsQuantity})

            const foundShedule = await shedulesRepository.getSheduleById(sheduleId)
            
            newSlotsArray.forEach(item =>{
                checkScheduleSlotsConflict(foundShedule.slots,item) 
            })

            await shedulesRepository.addSlotsToShedule(sheduleId,newSlotsArray)
            return SlotsManager.sortShedulesSlotsArray(foundShedule.slots)
        }catch(error){
            throw error
        }
    }


    async addAdditionalSlot({sheduleId,startDateTime}){
        try{
           //creo un sobre turno con array de reservas vacio
           //Pero antes copruebo que no haya otros sobre turnos a esa hora?
        }catch(error){
            throw error
        }
    }

    async addCustomeToWaitingList({sheduleId,customeId,possibleDatesArray}){
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



function checkScheduleSlotsConflict(sheduleSlotsArray,newSlot){

    try{
        const sortedSlots = sheduleSlotsArray.sort((a, b) => new Date(a.startDateTime) - new Date(b.startDateTime))

        const filteredSortedSlots = sortedSlots.filter(slot => new Date(slot.endDateTime) > new Date(newSlot.startDateTime))
        
        console.log('-----SLOTS ORDENADOS-----------------------------------------------')
        sortedSlots.forEach(item => console.log(item.id,' ' ,item.startDateTime,"  ",item.durationInMinutes," ", item.endDateTime))
    
        console.log('-----SLOTS FILTRADOS-----------------------------------------------')
        filteredSortedSlots.forEach(item => console.log(item.id,' ',item.startDateTime,"  ",item.durationInMinutes," ", item.endDateTime))

        
        filteredSortedSlots.forEach(slot =>{
            SlotsManager.checkSlotsCollision(newSlot,slot)
            console.log('***** \n Sin Conflicto entre slots: \n', newSlot, '\n', slot)
        })


    }catch(error){
        throw error
    }
  

}