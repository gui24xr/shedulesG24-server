import { Company } from "../../database/models/models.company.js";






export class CompanyRepository {
  async createCompanyToUser({
    userId,
    companyName,
    logoUrl,
    street,
    streetNumber,
    floor,
    apartment,
    city,
    state,
    country,
    coordinates,
    postalCode,
    phonesNumbers,
    contactEmail,
  }) {
    console.log({
      userId,
      companyName,
      logoUrl,
      street,
      streetNumber,
      floor,
      apartment,
      city,
      state,
      country,
      coordinates,
      postalCode,
      phonesNumbers,
      contactEmail,
    });
    try {
      const newCompany = new Company({
        user: userId,

        profile: {
          name: companyName,
          logoUrl: logoUrl,
          location: {
            street: street,
            streetNumber: streetNumber,
            floor: floor,
            aparment: apartment,
            city: city,
            state: state,
            country: country,
            postalCode: postalCode,
            coordinates: coordinates || null,
          },
          contactData: {
            phonesNumbers: phonesNumbers || [],
            email: contactEmail,
          },
        },
      });

      await newCompany.save();
      return getMapRecord(newCompany);
    } catch (error) {
      console.error("Error creating company in Repository:", error);
      throw error;
    }
  }


  async getCompanies({ userId }) {
    try {
      const foundedCompanies = await Company.find({ user: userId }).lean()
      const listOfMapRecords = foundedCompanies.map(item => (getMapRecord(item)))
      return listOfMapRecords
    } catch (error) {
      throw error
    }
  }


  async getCompanyById(id) {
    try {
      const foundedCompany = await Company.findById(id).lean()
      if (!foundedCompany) return new Error("compania inexistente.")
      return getMapRecord(foundedCompany)
    } catch (error) {
      throw error
    }
  }

  async addOffering(companyId, offeringId) {
    try {
      const foundedCompany = await Company.findById(companyId)
      if (!foundedCompany) return new Error("compania inexistente.")
      foundedCompany.offerings.push(offeringId)
      return foundedCompany.save()
    } catch (error) {
      throw error
    }
  }



}


function getMapRecord(company) {
  return {
    user: company.user.toString(),
    id: company._id.toString(),
    name: company.profile.name,
    urlLogo: company.profile.urlLogo,
    location: {
      address: `${company.profile.location.street} ${company.profile.location.streetNumber}`,
      city: company.profile.location.city,
      state: company.profile.location.state,
      country: company.profile.location.country,
      postalCode: company.profile.location.postalCode,
      coordinates: company.profile.location.coordinates || null,
    },
    contactData: {
      phones: company.profile.contactData.phonesNumbers || null,
      email: company.profile.contactData.email,
    },
    businessData: {
      email: company.businessData.email || null,
      whatsappNumbers: company.businessData.whatsappNumber || null,
    },
    offerings: company.offerings,
    customers: company.customers,
    customersCounter: company.customersCounter, 
  }
}