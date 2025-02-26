import { Offering } from "../../database/models/models.offering.js"


export class OfferingRepository{
    async getOfferingById(id){
        try{
            const companyOfferings = await Offering.find({company:id})
            return getMapRecord(companyOfferings.lean())
        }catch(error){
            throw error
        }
    }

    async createOfferingWithEmptyShedule({name,description,agentName,agentLastName,sheduleId}){
        try{
            const newOfferingCompany = new Offering({
                name: name,
                description: description,
                agent:{
                    firstName: agentName,
                    lastName: agentLastName
                },
                shedule: sheduleId
            })
            console.log('oferta creada en repo: ', newOfferingCompany)
            await newOfferingCompany.save()
            return getMapRecord(newOfferingCompany)
        }catch(error){
            throw error
        }
    }
}


function getMapRecord(record){
    return {
        id: record._id.toString(),
        name: record.description,
        agent: {
            firstName: record.agent.name,
            lastName: record.agent.lastName
        },
        shedule: record.shedule.toString()
    }
}