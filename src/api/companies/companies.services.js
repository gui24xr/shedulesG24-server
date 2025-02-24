
import { CompanyRepository } from "./companies.repository.js";
import { OfferingsService } from "../offerings/service.js";

const companiesRepository = new CompanyRepository()
const offeringsService = new OfferingsService()

export class CompanyService {
  async createCompanyToUser({userId,companyName,logoUrl,street,streetNumber,
    floor,apartment,city,state,country,postalCode,phonesNumbers,contactEmail,
  }) {
    try {
      const newCompany = await companiesRepository.createCompanyToUser({
        userId,companyName,logoUrl,street,streetNumber,floor,apartment,city,
        state,country,coordinates,postalCode,phonesNumbers,contactEmail,})
      return newCompany
    } catch (error) {
      console.error("Error creating company in Service:", error);
      throw error;
    }
  }


  async getUsersCompanies(userId){
    try{
        const foundedCompanies = await companiesRepository.getCompanies({userId})
        return foundedCompanies
    }catch(error){
        throw error
    }
  }

  async getCompanyById(id){
    try{
        const foundedCompanies = await companiesRepository.getCompanyById(id)
        return foundedCompanies
    }catch(error){
        throw error
    }
  }


  async createOfferingToCompany({userId,companyId,name,description,agentName,agentLastName}) {
    try {
      const foundedCompany = await companiesRepository.getCompanyById(companyId)
      if (foundedCompany.user != userId) throw new Error('Recurso protegido')
      const createdOffering = await offeringsService.createOfferingWithEmptyShedule({name,description,agentName,agentLastName})
      await companiesRepository.addOffering(companyId,createdOffering._id)
      return createdOffering
      
    } catch (error) {
      console.error("Error creating offering in Service:", error);
      throw error;
    }
  }


}
