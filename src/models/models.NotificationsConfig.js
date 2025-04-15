import mongoose from "mongoose";

const notificationsConfigSchema = new mongoose.Schema({
  establishmentId:{
    type: mongoose.Schema.Types.ObjectId, 
    ref:'Establishment',
    required: true
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
const  NotificationsConfig = mongoose.model(modelName, notificationsConfigSchema);

export default NotificationsConfig
