import mongoose from "mongoose";

const notificationsConfigSchemma = new mongoose.Schema({
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

const modelName = "NotificationsConfig";
export const CompanyBranch = mongoose.model(modelName, notificationsConfigSchemma);
