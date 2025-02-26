import mongoose from "mongoose";

const offeringSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  agent: {
    firstName: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
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
  }
});

const modelName = "Offering";
export const Offering = mongoose.model(modelName, offeringSchema);
