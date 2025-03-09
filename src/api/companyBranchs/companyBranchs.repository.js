import { MongooseRepository } from '../../common/mongooseRepository.js'
import { CompanyBranch }from '../../models/index.js'
import { companyBranchSchema } from './companyBranchs.schema.js'



class CompanyBranchs extends MongooseRepository{
    constructor({ model, validateSchema, populateFieldsArray }) {
        super({ model, validateSchema, populateFieldsArray })
    }
}

export const companyBranchsRepository = new CompanyBranchs({
    model: CompanyBranch,
    validateSchema: companyBranchSchema,
    populateFieldsArray: []
})



/*
export class CompanyBranchsRepository {
  async createCompanyBranch({ name, companyId,location }) {
    try {
      const newCompanyBranch = await CompanyBranch.create({
        name,
        companyId: companyId || null,
        location: location || null
      });
      return this.getMappedObject(newCompanyBranch.toObject());
    } catch (error) {
      throw error;
    }
  }

  async getCompanyBranchById(id) {
    try {
      const foundedBranch = await CompanyBranch.findById(id).lean();
      if (!foundedBranch) throw new Error("No existe la company branch");
      return this.getMappedObject(foundedBranch);
    } catch (error) {
      throw error;
    }
  }


  async getCompanyBranchs({name,companyId}) {
    try {
      console.log('Entre al repoooo')
      const filter = {}
      if (name) filter.name = name
      if (companyId) filter.companyId = companyId
      
      const companiesBranch = await CompanyBranch.find(filter).lean();
      return companiesBranch.map ( item => (this.getMappedObject(item)));
    } catch (error) {
      throw error;
    }
  }


  

  async updateCompanyBranchName(id, newName) {
    try {
      if (!newName)
        throw new Error("No se ingreso nuevo nombre para actualizar...");
      const updatedBranch = await CompanyBranch.findByIdAndUpdate(
        id,
        { $set: { name: newName } },
        { new: true }
      );
      if (!updatedBranch)  throw new Error('No existe el registro que se intenta actualizar...')
        return this.getMappedObject(updatedBranch.toObject());
    } catch (error) {
      throw error;
    }
  }

  async updateCompanyBranchNameAndLocation(id,{name,companyId,location}) {
    try {

      const updateData = {};
      if (name) updateData.name = name
      if (companyId) updateData.companyId = companyId
      if (location) updateData.location = location
      
      const updatedBranch = await CompanyBranch.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
      if (!updatedBranch)  throw new Error('No existe el registro que se intenta actualizar...')
      return this.getMappedObject(updatedBranch.toObject());
    } catch (error) {
      throw error;
    }
  }

  

  async deleteCompanyBranchs(idsList) {
    try {
      const result = await CompanyBranch.deleteMany({
        _id: { $in: idsList },
      });
      if (result.deletedCount < idsList.length) throw new Error("Uno o mas registros no han sido borrados...")
      return result.deletedCount;
    } catch (error) {
      throw error;
    }
  }

  getMappedObject(companyBranch) {
    return {
      id: companyBranch._id.toString(),
      name: companyBranch.name,
      companyId: companyBranch.companyId,
      location: companyBranch.location ? {
        "street": companyBranch.location.street,
        "streeNumber": companyBranch.location.streeNumber,
        "floor": companyBranch.location.floor,
        "apartment": companyBranch.location.apartment,
        "city": companyBranch.location.city,
        "postalCode": companyBranch.location.postalCode,
        "state": companyBranch.location.state,
        "country": companyBranch.location.country,
        "latitude": companyBranch.location.latitude,
        "longitude": companyBranch.location.longitude,
      } : null
    }
  }
}

*/