import { OfferingsService } from "./service.js"

const offeringsService = new OfferingsService()

export class OfferingControllers{

    async getOfferings(req,res,next){
        try{
            
        }catch(error){
            res.status(500).json({error:error})
        }
    }

    async createOffering(req,res,next){
        try{
            const {userId,companyId,name,description,agentFirstName,agentLastName} = req.body
            const createdOffered = await offeringsService.createOfferingWithEmptyShedule({name,description,agentFirstName,agentLastName})
            return res.status(201).json({
                createdOffered
            }) 
        }catch(error){
            res.status(500).json({error:error})
        }
    }




}