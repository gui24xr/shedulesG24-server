import { NotificationsConfigsRepository } from "./repository.js";

const notificationsConfigsRepository = new NotificationsConfigsRepository()

export class NotificationsConfigsControllers{
    async create(req,res,next){
        try{
           const created = await notificationsConfigsRepository.createNotificationsConfig(req.body.companyId)
           return res.status(201).json({...created})
        }catch(error){
            next(error)
        }
    }

    async getOne(req,res,next){
        try{
           const {ncid:companyId} = req.params
           const created = await notificationsConfigsRepository.getNotificationsConfigById(companyId)
           return res.status(200).json({...created})
        }catch(error){
            next(error)
        }
    }

    async getMany(req,res,next){
        try{
           const {cid:companyId} = req.query
           console.log('cid: ', companyId)
           const result = await notificationsConfigsRepository.getNotificationsConfigs(companyId ? {companyId:companyId} : {})
           return res.status(200).json([...result])
        }catch(error){
            next(error)
        }
    }

    async delete(req,res,next){
        try{
            const ids = req.query.ids?.split(",");
            const result = await notificationsConfigsRepository.deleteNotificationsConfig(ids)
            return res.status(201).json({message:`Se han borrado ${result} NotificationsConfig.`})
        }catch(error){
            next(error)
        }
    }

    async updateWhatsAppConfig(req,res,next){
        try{
           //Validar datos whatsappconfig
           const {ncid:notificationsConfigId} = req.params
           //validar body
           const updated = await notificationsConfigsRepository.setWhatsAppConfig(notificationsConfigId,{...req.body})
           return res.status(201).json({...updated})
        }catch(error){
            next(error)
        }
    }

    async updateSMSConfig(req,res,next){
        try{
            //Validar datos whatsappconfig
            const {ncid:notificationsConfigId} = req.params
            //validar body
        }catch(error){
            next(error)
        }
    }

    async updateEmailConfig(req,res,next){
        try{
            //Validar datos whatsappconfig
            const {ncid:notificationsConfigId} = req.params
            //validar body
        }catch(error){
            next(error)
        }
    }
}