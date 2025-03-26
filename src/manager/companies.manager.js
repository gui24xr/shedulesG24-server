import { companiesRepository } from "../repositories/companies.repository.js";
import { companySchema } from "../schemas/companies.schemas.js";
import { UnauthorizedError, OperationNotAllowedError } from "../errors/index.js";





export class CompanyManager{
    createCompanyToUser = async (companyData) => {
        try{
            companySchema.createSchema.parse(companyData)
            const usersCompanies = await companiesRepository.getByQuery({userId: companyData.userId})
            if(usersCompanies.length > 0){
                throw new OperationNotAllowedError('El usuario ya tiene una empresa asociada')
            }

            const newCompany = await companiesRepository.create(companyData)

            //transformar el dto.
            return newCompany
        }catch(error){
            throw error
        }
    }
    
    
    getCompanyById = async (userId,companyId) => {
        try{
            await this.checkPermissions(userId, companyId);
            const foundedCompany = await companiesRepository.getById(companyId)
            return foundedCompany
        }catch(error){
            throw error
        }
    }

    getCompanyByUserId = async (userId) => {
        try{
            const foundedCompany = await companiesRepository.getByQuery({userId})
            if (!(foundedCompany.length > 0)) return null
            return foundedCompany[0]
        }catch(error){
            throw error
        }
    }

    updateDataCompany = async (userId,companyId,updateData) => {
        try{
            companySchema.updateSchema.parse(updateData)
            await this.checkPermissions(userId, companyId);
            const updatedCompany = await companiesRepository.updateById(companyId,updateData)
            return updatedCompany

        }catch(error){
            throw error
        }
    }


    checkPermissions = async (userId, companyId) => {
        const foundedCompany = await companiesRepository.getById(companyId);
    
        if (!foundedCompany || foundedCompany.userId !== userId) {
            throw new UnauthorizedError('No tienes permisos para ver/modificar esta empresa');
        }
    
        return true; 
    }
}