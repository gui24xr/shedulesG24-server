import mongoose from "mongoose";

const companyBranchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyId:{
    type: mongoose.Schema.Types.ObjectId, 
    default: null,
    required: false
  },
  location: {
    type: {
      street: { type: String, required: false, default: null },
      streeNumber: { type: String, required: false, default: null },
      floor: { type: String, required: false, default: null },
      apartment: { type: String, required: false, default: null },
      city: { type: String, required: false, default: null },
      postalCode: { type: String, required: false, default: null },
      state: { type: String, required: false, default: null },
      country: { type: String, required: false, default: null },
      latitude: { type: Number, required: false, default: null },
      longitude: { type: Number, required: false, default: null },
    },
    default: null,  
  },
  notificationConfig:{
    type: {
        whatsApp: {
            type: String,
            required: false,
            default: null,
          },
          SmsNumber: {
            type: String,
            required: false,
            default: null,
          },
          email: {
            type: String,
            required: false,
            match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
            default: null,
          },
    },
    default: null
  }
  
});

const modelName = "CompanyBranch";
export const CompanyBranch = mongoose.model(modelName, companyBranchSchema);
