import { CompanyBranchsRepository } from "./src/api/companyBranchs/companyBranchs.repository.js";
import { companyBranchSchema } from "./src/api/companyBranchs/companyBranchs.schema.js";

const companyBranchsRepository = new CompanyBranchsRepository()

export class CompanyBranchsControllers{
    
    async create(req,res,next){
    try{
        companyBranchSchema.createSchema.parse(req.body)
        const createdBranch = await companyBranchsRepository.createCompanyBranch(req.body)
        return res.status(201).json({...createdBranch})
    }catch(error){
        next(error)
    }

    }

    async getOne(req,res,next){
        try{
            const {bid:branchId} = req.params
            return res.status(200).json({...await companyBranchsRepository.getCompanyBranchById(branchId)})
        }catch(error){
            next(error)
        }
    }
   
    async getMany(req,res,next){
        try{
            if (Object.keys(req.query).length>0){
                companyBranchSchema.querySchema.parse(req.query)
                return res.status(209).json([...await companyBranchsRepository.getCompanyBranchs(req.query)])
            }
            return res.status(209).json([...await companyBranchsRepository.getCompanyBranchs({})])
        }catch(error){
            next(error)
        }
    }

  

    async delete(req,res,next){
        try{
            const branchsIdList = req.query.ids?.split(",")
            await companyBranchsRepository.deleteCompanyBranchs(branchsIdList)
            return res.status(204)
        }catch(error){
            next(error)
        }
    }

    async update(req,res,next){
        try{
            const {bid:branchId} = req.params
            companyBranchSchema.updateSchema.parse(req.body)
            res.status(201).json({...await companyBranchsRepository.updateCompanyBranchNameAndLocation(branchId, req.body)})
        }catch(error){
            next(error)
        }
    }
}