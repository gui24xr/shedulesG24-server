import {NotificationsConfig} from '../../database/models/models.NotificationsConfig.js'
import { DataBaseError } from "../../errors/DataBaseError.js"
import mongoose from 'mongoose'

export class NotificationsConfigsRepository{

    
    async createNotificationsConfig(companyId) {
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
      

   /*
  createNotificationsConfig(companyId) {

     return NotificationsConfig.create({companyId})
            .then(doc => this.getMappedObject(doc.toObject()))
            .catch(error => { throw error} )
  }
*/




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

/*
    getNotificationsConfigs({companyId}){

          const filter = {}
          if (companyId) filter.companyId = companyId
          return NotificationsConfig.find(filter).lean()
          .then(docs => {
            return docs.map(item => (this.getMappedObject(item)))
          })
          .catch(error => {throw error})
          
  }
*/




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
          if (isEnabled) updateData["whatsApp.enabled"] = isEnabled
          if (isAutomatic) updateData["whatsApp.automatic"] = isAutomatic
          updateData["whatsApp.updatedAt"] = Date.now()

          const updatedNotificationsCofig = await NotificationsConfig.findByIdAndUpdate(
            notificationsConfigId,
            { $set: {
              ...updateData
            } },
            { new: true }
          );
          return this.getMappedObject(updatedNotificationsCofig.toObject());
        } catch (error) {
            if (error instanceof mongoose.Error) throw new DataBaseError(error.message)
            throw error
        }
      }

      async setSmsConfig(notificationsConfigId,phoneNumber,isEnabled,isAutomatic) {
        try {
          const updateData = {}
          updateData.sms.phoneNumber = phoneNumber;
          updateData.sms.enabled = isEnabled
          updateData.sms.isAutomatic = isAutomatic
          updateData.sms.updatedAt = Date.now()

          const updatedNotificationsCofig = await NotificationsConfig.findByIdAndUpdate(
            notificationsConfigId,
            { $set: updateData },
            { new: true }
          );
          return this.getMappedObject(updatedNotificationsCofig.toObject());
        } catch (error) {
            if (error instanceof mongoose.Error) throw new DataBaseError(error.message)
            throw error
        }
      }

      async setEmailConfig(notificationsConfigId,email,isEnabled,isAutomatic) {
        try {
          const updateData = {}
          updateData.email.phoneNumber = email;
          updateData.email.enabled = isEnabled
          updateData.email.isAutomatic = isAutomatic
          updateData.email.updatedAt = Date.now()

          const updatedNotificationsCofig = await NotificationsConfig.findByIdAndUpdate(
            notificationsConfigId,
            { $set: updateData },
            { new: true }
          );
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