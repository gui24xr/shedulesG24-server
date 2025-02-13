import { Company } from "../../database/models/models.company.js";
import { UsersService } from "../users/users.service.js";
import { CompanyDTO } from "./companies.dto.js";

const usersService = new UsersService()

export class CompanyService{
     async createCompanyToUser({userId,companyName,logoUrl,street,streetNumber,floor,apartment,city,state,country,coordinates,postalCode,phonesNumbers,contactEmail}) {
            try{
                const newCompany = new Company({
                    profile:{
                        name:companyName,
                        logoUrl:logoUrl,
                    },
                    location:{
                        street:street,
                        streetNumber:streetNumber,
                        floor:floor,
                        aparment:apartment,
                        city:city,
                        state:state,
                        country:country,
                        postalCode: postalCode,
                        coordinates:coordinates || null
                    },
                    contactData:{
                        phonesNumbers: phonesNumbers || null,
                        email: contactEmail
                    }
                })
                
                await newCompany.save()
                await usersService.addCompany({userId:userId,companyId:newCompany._id})
                return new CompanyDTO(newCompany)


            }catch(error){
                console.error("Error creating company in Service:", error);
                throw error
            }
        }
    
        async deleteCompany(id){
            try{
                await companyRepository.deleteCompany(id)
            }catch(error){
                console.error("Error deleting company In service:", error);
                throw error
            }
        }
}