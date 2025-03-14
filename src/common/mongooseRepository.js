
export class MongooseRepository {

    constructor({model,validateSchema,populateFieldsArray}){
        this.model = model
        this.validateSchema = validateSchema
        this.populateFieldsArray = populateFieldsArray || []        
    }

    async create(data){
        try{
            this.validateSchema.createSchema.parse(data)
            const created = await this.model.create({...data})
            //return this.getMappedObject(created.toObject())
            return created.toObject()
        }catch(error){
            throw error
        }
    }

    async getById(id){
        try{
            const founded = await this.model.findById(id).exec()/*.populate(this.populateFieldsArray).lean()*/
            if (!founded) throw new Error(`Registro id ${id} no encontrado...`)
            //return this.getMappedObject(founded)
            return founded.toObject({ virtuals: true });
        }catch(error){
            throw error
        }
    }

    async getByQuery(query){
        try{
            this.validateSchema.querySchema.parse(query)
            const founded = await this.model.find(query).exec()/*.populate(this.populateFieldsArray).lean({ transform: true })*/
            console.log(founded)
            //return founded.map(item => (this.getMappedObject(item)))
            return founded
        }catch(error){
            throw error
        }
    }

    async updateById(id,updateData){
        try{
            this.validateSchema.updateSchema.parse(updateData)
            const updatedObject = await this.model.findByIdAndUpdate(
                id,
                {$set : updateData},
                {new: true}
            ).exec()//.populate(this.populateFieldsArray)
            if (!updatedObject)  throw new Error('No existe el registro que se intenta actualizar...')
            //return this.getMappedObject(updatedObject)
            return updatedObject.toObject()
        }catch(error){
            throw error
        }
    }

    async findOneAndCreateOrUpdate(filter,createData,updateData){
        try{
            this.validateSchema.querySchema.parse(filter)
            this.validateSchema.updateSchema.parse(updateData)
            const updatedObject = await this.model.findOneAndUpdate(
                filter,
                { $setOnInsert: createData,$set: updateData },
                { upsert: true, new: true, }).exec()
            
            if (!updatedObject)  throw new Error('No existe el registro que se intenta actualizar...')
            //return this.getMappedObject(updatedObject)
            return updatedObject.toObject()
        }catch(error){
            throw error
        }
    }

    async deleteManyById(idsList){
        try{
             const result = await this.model.deleteMany({
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