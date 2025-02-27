import { CompanyBranchsRepository } from "./repository.js";
import { companyBranchSchema,querySchema } from "./schema.js";

const companyBranchsRepository = new CompanyBranchsRepository()

export class CompanyBranchsControllers{
    
    async create(req,res,next){
    try{
        companyBranchSchema.parse(req.body)
        const createdBranch = await companyBranchsRepository.createCompanyBranch(
            {name:req.body.name,
            companyId:req.body.companyId,
            location: req.body.location
        })
        return res.status(201).json({branch: createdBranch})
    }catch(error){
        next(error)
    }

    }

    async getOne(req,res,next){
        try{
            const {bid:branchId} = req.params
            return res.status(200).json({branchs: await companyBranchsRepository.getCompanyBranchById(branchId)})
        }catch(error){
            next(error)
        }
    }
   
    async getMany(req,res,next){
        try{
            if (Object.keys(req.query).length === 0){
                console.log('entrar a todos: ', req.query)
                return res.status(200).json({branchs: await companyBranchsRepository.getCompanyBranchs({})})
            }
            
            querySchema.parse(req.query)
            return res.status(200).json({
                branchs:  await companyBranchsRepository.getCompanyBranchs({
                    branchsIdList: req.query.ids && req.query.ids.split(','),
                    company: req.query.company && req.query.company })})
        }catch(error){
            next(error)
        }
    }

  

    async delete(req,res,next){
        try{
            querySchema.parse(req.query)
            const branchsIdList = req.query.ids?.split(",")
            const result = await companyBranchsRepository.deleteCompanyBranchs(branchsIdList)
            return res.status(201).json({message: `Se han borrado ${result} bookings`})
        }catch(error){
            next(error)
        }
    }

    async update(req,res,next){
        try{
            companyBranchSchema.parse(req.body)
            const updated = await companyBranchsRepository.updateCompanyBranchNameAndLocation(req.params.bid,req.body.name,req.body.location)
            res.status(201).json({branchs:updated})
        }catch(error){
            next(error)
        }
    }
}