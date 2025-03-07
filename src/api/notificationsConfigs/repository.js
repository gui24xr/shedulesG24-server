import {NotificationsConfig} from '../../database/models/models.NotificationsConfig.js'
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