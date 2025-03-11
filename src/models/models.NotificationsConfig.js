import mongoose from "mongoose";
import { formatDoc } from "../config/database.plugins.js";

const notificationsConfigSchema = new mongoose.Schema({
  companyId:{
    type: mongoose.Schema.Types.ObjectId, 
    default: null,
    ref:'Company',
    required: false
  },
  whatsApp: {
   
    phoneNumber:{
      type: String,
      required: false,
      default: null,
    },
    enabled:{
      type:Boolean,
      default: false
    },
    automatic:{
      type:Boolean,
      default: false
    },
    updatedAt: { type: Date, default: Date.now },
   },

  
  sms: {
   
     phoneNumber:{
       type: String,
       required: false,
       default: null,
     },
     enabled:{
       type:Boolean,
       default: false
     },
     automatic:{
       type:Boolean,
       default: false
     },
     updatedAt: { type: Date, default : Date.now },
 
   },

   
   email: {
   
     email:{
       type: String,
       required: false,
       default: null,
     },
     enabled:{
       type:Boolean,
       default: false
     },
     automatic:{
       type:Boolean,
       default: false
     },
     updatedAt: { type: Date, default: Date.now },
   
   },
});

notificationsConfigSchema.plugin(formatDoc)

const modelName = "NotificationsConfig";
const  NotificationsConfig = mongoose.model(modelName, notificationsConfigSchema);

export default NotificationsConfig
