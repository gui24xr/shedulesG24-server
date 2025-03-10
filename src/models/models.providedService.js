import mongoose from "mongoose";

const providedServiceSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyBranch",
    default: null
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  providerId:{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
    default: null
  }, 
  sheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shedule",
    default: null
  },
  
  companyBranchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyBranch",
    default: null
  },
  notificationsConfigId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "notificationsConfig",
    default: null
  }
});

const modelName = "ProvidedService";
const providedService = mongoose.model(modelName, providedServiceSchema);

export default providedService
