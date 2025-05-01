import mongoose from 'mongoose'
import attendanceModes from "../constants/constants.attendanceModes.js";
import schedulingConfigType from "../constants/constants.shedulingConfigType.js";
import businessCategories from "../constants/constants.businessCategories.js";

const establishmentConfigSchema = new mongoose.Schema({
  establishmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Establishment",
    required: true
  },
  businessCategory: {
    type: String,
    enum: businessCategories.map(category => category.category),
    required: false,
    default: null
  },
  attendanceMode: {
    type: String,
    enum: attendanceModes.map(attendanceMode => attendanceMode.type),
    required: false,
    default: null
  },
  schedulingConfigType: {
    type: String,
    enum: schedulingConfigType.map(shedulingConfigType => shedulingConfigType.type),
    required: false,
    default: null,
  },
  notificationsProfileId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "NotificationsProfile",
    required: false,
    default: null
  },
  displayLocations:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Location",
    required: false,
    default: []
  }]
})

establishmentConfigSchema.virtual('status').get(function(){
  const missingConfigs = []
  if(!this.businessCategory) missingConfigs.push('businessCategory')
  if(!this.attendanceMode) missingConfigs.push('attendanceMode')
  if(!this.schedulingConfigType) missingConfigs.push('schedulingConfigType')
  if(!this.notificationsProfileId) missingConfigs.push('notificationsProfileId')
  if(this.displayLocations.length === 0) missingConfigs.push('withoutDisplayLocations')
  if(missingConfigs.length > 0) return {status: 'pending', missingConfigs}
  return {status: 'ok', missingConfigs}
})

const establishmentsConfig = mongoose.model("EstablishmentConfig", establishmentConfigSchema);

export default establishmentsConfig;
