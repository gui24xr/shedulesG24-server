import { Offering } from "../../database/models/models.offering.js"


export class OfferingRepository{
    
    async createOffering({companyId,name,description,providerId,sheduleId,companyBranchId,notificationsConfigId}){
        try{
            const newOffering = await Offering.create({
                company: companyId,
                name: name,
                description: description,
                provider: providerId || null,
                shedule: sheduleId || null,
                companyBranch: companyBranchId || null,
                notificationsConfig: notificationsConfigId || null
            })
            return this.getMappedObject(newOffering.toObject())
        }catch(error){
            throw error
        }
    } 

    async getOfferingById(companyId){
        try{
            const companyOfferings = await Offering.findById(companyId).lean()
            return this.getMappedObject(companyOfferings)
        }catch(error){
            throw error
        }
    }

    async getOfferings({companyId,name,companyBranchId,providerId}){
        try{
        //Aca estaria bueno validar el esquema y entonces en params puedo poner queryDirectamente
          const queryObject = arguments[0]
          const queryObjectEntriesArray = Object.entries(queryObject)
          const filter = {}
          queryObjectEntriesArray.forEach( item =>  filter[item[0]] = item[1])

          const founded = await Offering.find(filter).lean()
          return founded.map(item => (this.getMappedObject(item)))
        }catch(error){
            throw error
        }
    }

    async updateOffering(offeringId,{name,companyBranchId,providerId}){
        try{
             //Aca estaria bueno validar el esquema y entonces en params puedo poner queryDirectamente
             const queryObject = arguments[1]
             const updateObjectEntriesArray = Object.entries(queryObject)
             const updateData = {}
             updateObjectEntriesArray.forEach( item =>  updateData[item[0]] = item[1])

             const updatedObject = await Offering.findByIdAndUpdate(
                offeringId,
                {$set : updateData},
                {new: true}
             ).populate('provider')
             if (!updatedObject)  throw new Error('No existe el registro que se intenta actualizar...')
            return this.getMappedObject(updatedObject)

        }catch(error){
            throw error
        }
    }

     async deleteOfferings(idsList){
            try{
                const result = await Offering.deleteMany({
                    _id: {$in: idsList}
                })
                if (result.deletedCount < idsList.length) throw new Error("Uno o mas registros no han sido borrados...")
                return result.deletedCount
            }catch(error){
                throw error
            }
        }




    getMappedObject(record){
        const formatedId =record._id.toString()
        
        delete record._id,
        delete record.__v
        return {
           id: formatedId,
          ...record,
        };
      }
}



