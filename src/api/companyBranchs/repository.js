import { CompanyBranch } from "../../database/models/models.companyBranch.js";

export class CompanyBranchsRepository {
  async createCompanyBranch({ name, companyId,location }) {
    try {
      const newCompanyBranch = await CompanyBranch.create({
        name,
        companyId: companyId || null,
        location
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


  async getCompanyBranchs({branchsIdList,companyId}) {
    try {
      console.log('Entre al repoooo')
      const filter = {}
      if (branchsIdList) filter._id = { $in: branchsIdList }
      if (companyId) filter.companyId = companyId
      console.log('Lista Ingresada', branchsIdList)
      console.log('Filtro a aplicar: ',filter)
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
      const updateBranch = await CompanyBranch.findByIdAndUpdate(
        id,
        { $set: { name: newName } },
        { new: true }
      );
      return this.getMappedObject(updateBranch);
    } catch (error) {
      throw error;
    }
  }

  async updateCompanyBranchNameAndLocation(id, name,locationData) {
    try {

      const updateData = {};
      updateData.name = name
      for (const [key, value] of Object.entries(locationData)) {
        if (value !== undefined) {
          updateData[key] = value;
        }
      }
      
      const updatedBranch = await CompanyBranch.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );

      return this.getMappedObject(updatedBranch);
    } catch (error) {
      throw error;
    }
  }

  

  async deleteCompanyBranchs(idsList) {
    try {
      const result = await CompanyBranch.deleteMany({
        _id: { $in: idsList },
      });
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
