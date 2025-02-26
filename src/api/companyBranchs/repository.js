import { CompanyBranch } from "../../database/models/models.companyBranch.js";

export class CompanyBranchsRepository {
  async createCompanyBranch({ name, companyId }) {
    try {
      const newCompanyBranch = await CompanyBranch({
        name,
        companyId: companyId || null,
      });
      return newCompanyBranch.toObject();
    } catch (error) {
      throw error;
    }
  }

  async getCompanyBranchById(id) {
    try {
      const foundedBranch = await CompanyBranch.findById(id).lean();
      if (!foundedBranch) throw new Error("No existe la company branch");
      return foundedBranch;
    } catch (error) {
      throw error;
    }
  }

  async getCompaniesBranchs() {
    try {
      const companiesBranch = await CompanyBranch.find().lean();
      return companiesBranch;
    } catch (error) {
      throw error;
    }
  }

  async getCompanyBranchsList(companiesIdsList) {
    try {
      const companiesBranch = await CompanyBranch.find({
        _id: { $in: companiesIdsList },
      }).lean();
      return companiesBranch;
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
      return updateBranch;
    } catch (error) {
      throw error;
    }
  }

  async updateCompanyBranchLocation(id, locationData) {
    try {
      const updateData = {};
      for (const [key, value] of Object.entries(locationData)) {
        if (value !== undefined) {
          updateData[key] = value;
        }
      }
      const updateBranch = await CompanyBranch.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
      return updateBranch;
    } catch (error) {
      throw error;
    }
  }

  async updateNotificationConfiguration(id, { whatsApp, smsNumber, email }) {
    try {
      const updateData = {};
      if (whatsApp) updateData.whatsApp = whatsApp;
      if (smsNumber) updateData.smsNumber = smsNumber;
      if (email) updateData.email = email;

      const updateBranch = await CompanyBranch.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      );
      return updateBranch;
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

  getMappedCompanyBranch(companyBranch) {
    return companyBranch;
  }
}
