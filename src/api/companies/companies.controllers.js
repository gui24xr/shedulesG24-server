import { OfferingControllers } from "../offerings/controllers.js";
import { CompanyService } from "./companies.services.js";

const companyService = new CompanyService()

export const companiesController = {

    createCompany: async (req,res,next) => {
        try{
            const {companyName,logoUrl,street,streetNumber,floor,apartment,city,postalCode,state,country,coordinates,phonesNumbers,contactEmail} = req.body

            const newCompany = await companyService.createCompanyToUser({
                userId: req.user.id,
                companyName,logoUrl,street,streetNumber,floor,apartment,city,state,postalCode,country,coordinates,phonesNumbers,contactEmail}
            )

            return res.status(201).json({
                message: 'Company created!',
                company: newCompany
            })

        }catch(error){
            console.error(error)
            res.status(500).json({ message: "Error interno del servidor" });
        }
    },


    getCompanies: async(req,res,next) => {
        try{
            const companies = await companyService.getUsersCompanies(req.user.id)
            return res.status(200).json({companies})
        }catch(error){
            res.status(500).json({ message: "Error interno del servidor" });
        }
    },

    getCompanyById: async(req,res,next) => {
        try{
            const {cid} = req.params
            const foundedCompany = await companyService.getCompanyById(cid)
            if (foundedCompany.user.toString() !== req.user.id) res.status(403).json({message: 'Recurso no autorizado...'})
            return res.status(200).json({company: foundedCompany})
        }catch(error){
            res.status(500).json({ message: "Error interno del servidor" });
        }
    },

    createOfferingToCompany: async(req,res,next)=>{
        try{
       
            const {cid:companyId} = req.params
            const {userId,name,description,agentName,agentLastName} = req.body
                 //const userId= req.user.id
            console.log('Pasando x el controller',userId,name,description,agentName,agentLastName, companyId )
            const createdOffering = await companyService.createOfferingToCompany({userId,companyId,name,description,agentName,agentLastName})
            return res.status(200).json({offering : createdOffering})
        }catch(error){
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    }






}
