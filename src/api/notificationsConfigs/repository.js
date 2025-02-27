import {NotificationsConfig} from '../../database/models/models.NotificationsConfig.js'
import { DataBaseError } from "../../errors/DataBaseError.js"

export class NotificationsConfigsRepository{

    async createNotificationsConfig(companyId) {
        try{
            const createdNotificationsConfig = await new NotificationsConfig.create({
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
            const result = await NotificationsConfig.find(filter)
            return result.map(item => (this.getMappedObject(item)))
        }
        catch(error){
            if (error instanceof mongoose.Error) throw new DataBaseError(error.message)
            throw error
        }
    }

    async getNotificationsConfigById(id){
        try{
            const foundedNotificationsConfig = await NotificationsConfig.findById(id)
            if (!foundedNotificationsConfig) throw new Error("No existe la configuracion buscada...")
            return this.getMappedObject(foundedNotificationsConfig)
        }catch(error){
            if (error instanceof mongoose.Error) throw new DataBaseError(error.message)
            throw error
        }
    }

      async setWhatsAppConfig(notificationsConfigId,phoneNumber,isEnabled,isAutomatic) {
        try {
          const updateData = {}
          updateData.whatsApp.phoneNumber = phoneNumber;
          updateData.whatsApp.enabled = isEnabled
          updateData.whatsApp.isAutomatic = isAutomatic
          updateData.whatsApp.updatedAt = Date.now()

          const updatedNotificationsCofig = await NotificationsConfig.findByIdAndUpdate(
            notificationsConfigId,
            { $set: updateData },
            { new: true }
          );
          return this.getMappedObject(updatedNotificationsCofig);
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
          return this.getMappedObject(updatedNotificationsCofig);
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
          return this.getMappedObject(updatedNotificationsCofig);
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
        return notificationsConfig;
    }


      
}