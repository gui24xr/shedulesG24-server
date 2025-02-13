import { Company } from "../../database/models/models.company.js";

export class CompanyRepository{
    async createCompany({name,logoUrl,address,phoneNumbers,email,whatsappNumber,appEmail}){
        try{
            const newCompany = new Company({
                name:name,
                contactData:{
                    logoUrl: logoUrl,
                    address: address,
                    phoneNumbers: phoneNumbers,
                    email: email
                    },
                appSettings:{
                    whatsappNumbers: whatsappNumber,
                    email: appEmail
                    }
                })
            return await newCompany.save()
        }catch(error){
            console.error("Error creating company:", error);
            throw error
        }
    }

    async deleteCompany(id){
        try{
            await Company.deleteOne({id:id})
        }catch(error){
            console.error("Error deleting company:", error);
            throw error
        }
    }
}