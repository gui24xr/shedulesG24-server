import { NotificationsConfigsRepository } from "./notificationsConfigs..js";
import { notificationsConfigSchema } from "./notificationsConfigs.schema.js/index.js";

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

//--------------------------------------------------------

import {NotificationsConfig}from '../../models/index.js'
import { DataBaseError } from "../../errors/DataBaseError.js"
import mongoose from 'mongoose'

export class NotificationsConfigsRepository{

    
    async createNotificationsConfig({companyId}) {
        try{
            const createdNotificationsConfig = await  NotificationsConfig.create({
                companyId
            })
            return this.getMappedObject(createdNotificationsConfig.toObject())
        }catch(error){
            if (error instanceof mongoose.Error) throw new DataBaseError(error.message)
            throw error
        }
    }
      



    async getNotificationsConfigs({companyId}){
        try{
            const filter = {}
            if (companyId) filter.companyId = companyId
            const result = await NotificationsConfig.find(filter).lean()
            return result.map(item => (this.getMappedObject(item)))
        }
        catch(error){
            if (error instanceof mongoose.Error) throw new DataBaseError(error.message)
            throw error
        }
    }






    async getNotificationsConfigById(id){
        try{
            const foundedNotificationsConfig = await NotificationsConfig.findById(id).lean()
            if (!foundedNotificationsConfig) throw new Error("No existe la configuracion buscada...")
            return this.getMappedObject(foundedNotificationsConfig)
        }catch(error){
            if (error instanceof mongoose.Error) throw new DataBaseError(error.message)
            throw error
        }
    }

      async setWhatsAppConfig(notificationsConfigId,{phoneNumber,isEnabled,isAutomatic}) {
        try {
        
          const updateData = {}
          if (phoneNumber) updateData["whatsApp.phoneNumber"] = phoneNumber;
          if (isEnabled != undefined) updateData["whatsApp.enabled"] = isEnabled
          if (isAutomatic != undefined) updateData["whatsApp.automatic"] = isAutomatic
          updateData["whatsApp.updatedAt"] = Date.now()

          const updatedNotificationsCofig = await NotificationsConfig.findByIdAndUpdate(
            notificationsConfigId,
            { $set: {
              ...updateData
            } },
            { new: true }
          );
          if (!updatedNotificationsCofig)  throw new Error('No existe el registro que se intenta actualizar...')
          return this.getMappedObject(updatedNotificationsCofig.toObject());
        } catch (error) {
            if (error instanceof mongoose.Error) throw new DataBaseError(error.message)
            throw error
        }
      }

      async setSmsConfig(notificationsConfigId,{phoneNumber,isEnabled,isAutomatic}) {
        try {
          const updateData = {}
          if (phoneNumber) updateData["sms.phoneNumber"] = phoneNumber;
          if (isEnabled != undefined) updateData["sms.enabled"] = isEnabled
          if (isAutomatic != undefined) updateData["sms.automatic"] = isAutomatic
          updateData["sms.updatedAt"] = Date.now()

          const updatedNotificationsCofig = await NotificationsConfig.findByIdAndUpdate(
            notificationsConfigId,
            { $set: {
              ...updateData
            } },
            { new: true }
          );
          if (!updatedNotificationsCofig)  throw new Error('No existe el registro que se intenta actualizar...')
          return this.getMappedObject(updatedNotificationsCofig.toObject());
        } catch (error) {
            if (error instanceof mongoose.Error) throw new DataBaseError(error.message)
            throw error
        }
      }

      async setEmailConfig(notificationsConfigId,{email,isEnabled,isAutomatic}) {
        try {
          console.log(email,isEnabled,isAutomatic)
          const updateData = {}
          if (email) updateData["email.email"] = email;
          if (isEnabled != undefined) updateData["email.enabled"] = isEnabled
          if (isAutomatic != undefined) updateData["email.automatic"] = isAutomatic
          updateData["email.updatedAt"] = Date.now()

          const updatedNotificationsCofig = await NotificationsConfig.findByIdAndUpdate(
            notificationsConfigId,
            { $set: {
              ...updateData
            } },
            { new: true }
          );
          if (!updatedNotificationsCofig)  throw new Error('No existe el registro que se intenta actualizar...')
          return this.getMappedObject(updatedNotificationsCofig.toObject());
        } catch (error) {
            if (error instanceof mongoose.Error) throw new DataBaseError(error.message)
            throw error
        }
      }


    async deleteNotificationsConfig(idsList) {
        try {
        const result = await NotificationsConfig.deleteMany({
            _id: { $in: idsList },
        });
        if (result.deletedCount < idsList.length) throw new Error("Uno o mas registros no han sido borrados...")
        return result.deletedCount;
        } catch (error) {
        throw error;
        }
    }
    
    getMappedObject(notificationsConfig) {
        const mappedObject = {
          id: notificationsConfig._id.toString(),
          ...notificationsConfig
        }
        delete mappedObject._id
        delete mappedObject.__v
        return mappedObject
    }


      
}