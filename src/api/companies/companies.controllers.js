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
            res.status(500).json({error:error})
        }
    }
}
