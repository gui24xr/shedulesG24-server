import { NotificationsConfigsRepository } from "./repository.js";
import { notificationsConfigSchema } from "./schema.js";

const notificationsConfigsRepository = new NotificationsConfigsRepository()

export class NotificationsConfigsControllers{
    async create(req,res,next){
        try{
           notificationsConfigSchema.createSchema.parse(req.body)
           const result = await notificationsConfigsRepository.createNotificationsConfig(req.body)
           return res.status(201).json({...result})
        }catch(error){
            next(error)
        }
    }

    async getOne(req,res,next){
        try{
           const {ncid:companyId} = req.params
           const result = await notificationsConfigsRepository.getNotificationsConfigById(companyId)
           return res.status(200).json({...result})
        }catch(error){
            next(error)
        }
    }

    async getMany(req,res,next){
        try{
            
            if (Object.keys(req.query).length>0){
                notificationsConfigSchema.querySchema.parse(req.query)
                return res.status(200).json([...await notificationsConfigsRepository.getNotificationsConfigs(req.query)])
            }
           return res.status(200).json([...await notificationsConfigsRepository.getNotificationsConfigs({})])
        }catch(error){
            next(error)
        }
    }

    async delete(req,res,next){
        try{
            const ids = req.query.ids?.split(",");
            await notificationsConfigsRepository.deleteNotificationsConfig(ids)
            return res.status(204)
        }catch(error){
            next(error)
        }
    }

    async updateWhatsAppConfig(req,res,next){
        try{
           const {ncid:notificationsConfigId} = req.params
           notificationsConfigSchema.updateWhatsAppConfigSchema.parse(req.body)
           return res.status(201).json({...await notificationsConfigsRepository.setWhatsAppConfig(notificationsConfigId,req.body)})
        }catch(error){
            next(error)
        }
    }

    async updateSMSConfig(req,res,next){
        try{
           const {ncid:notificationsConfigId} = req.params
           notificationsConfigSchema.updateSMSConfigSchema.parse(req.body)
           return res.status(201).json({...await notificationsConfigsRepository.setSmsConfig(notificationsConfigId,req.body)})
        }catch(error){
            next(error)
        }
    }

    async updateEmailConfig(req,res,next){
        try{
           const {ncid:notificationsConfigId} = req.params
           notificationsConfigSchema.updateEmailConfigSchema.parse(req.body)
           return res.status(201).json({...await notificationsConfigsRepository.setEmailConfig(notificationsConfigId,req.body)})
        }catch(error){
            next(error)
        }
    }
}