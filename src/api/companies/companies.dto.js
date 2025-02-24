
export class CompanyDTO{

    constructor(company){
        this.user = company.user,
        this.id = company._id.toString(),
        this.name = company.profile.name,
        this.urlLogo = company.profile.urlLogo,
        this.location = {
            address: company.profile.location.street + ' ' + company.profile.location.streetNumber,
            city: company.profile.location.city,
            state: company.profile.location.state,
            country: company.profile.location.country,
            postalCode: company.profile.location.postalCode,
            coordinates: company.profile.location.coordinates || null
        }
        this.contactData = {
            phones:company.profile.contactData.phonesNumbers || null,
            email:company.profile.contactData.email
        }
        this.businessData = {
            email: company.businessData.email || null,
            whatsappNumbers : company.businessData.whatsappNumber || null
        }
        this.offerings = company.offerings
        this.customers = company.customers
        this.custormersCounter = this.custormersCounter
    }
}
