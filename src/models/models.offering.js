import mongoose from "mongoose";

const offeringSchema = new mongoose.Schema({
  company: {
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
  provider:{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Provider",
    default: null
  }, 
  shedule: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shedule",
    default: null
  },
  
  companyBranch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyBranch",
    default: null
  },
  notificationsConfig: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "notificationsConfig",
    default: null
  }
});

const modelName = "Offering";
const Offering = mongoose.model(modelName, offeringSchema);

export default Offering
