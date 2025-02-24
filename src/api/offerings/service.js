import { ShedulesService } from "../shedules/service.js";
import { OfferingRepository } from "./repository.js";

const offeringRepository = new OfferingRepository()
const shedulesService = new ShedulesService()

export class OfferingsService{
    async getOfferingsByUserId(userId){
        try{
            //busco todas las companias del users en el service companies
            //Preparo una lista on la, agregacion
        }catch(error){
            throw error
        }
    }



    async createOfferingWithEmptyShedule({companyId,name,description,agentName,agentLastName}){
        try{
          //Debo chequear que la compania pertenecezca al user antes
            const newEmptyShedule = await shedulesService.createShedule()
            console.log('newEmptyShedule: ', newEmptyShedule, 'companyId: ', companyId)
            const createdOffering = await offeringRepository.createOfferingWithEmptyShedule({name,description,agentName,agentLastName,sheduleId:newEmptyShedule.id})
            return createdOffering
        }catch(error){
            throw error
        }
    }
} 