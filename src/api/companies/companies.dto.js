
export class CompanyDTO{

    constructor(company){
        this.id = company._id.toString(),
        this.name = company.profile.name,
        this.urlLogo = company.profile.urlLogo,
        this.location = {
            address: company.location.street + ' ' + company.location.streetNumber,
            city: company.location.city,
            state: company.location.state,
            country: company.location.country,
            postalCode: company.location.postalCode,
            coordinates: company.location.coordinates || null
        }
        this.contactData = {
            phones:company.contactData.phonesNumbers || null,
            email:company.contactData.email
        }
        this.businessData = {
            email: company.businessData.email || null,
            whatsappNumbers : company.businessData.whatsappNumber || null
        }
    }
}
