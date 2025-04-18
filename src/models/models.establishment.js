import mongoose from "mongoose";
import businessCategories from "../constants/constants.businessCategories.js";
import schedulingConfigType from "../constants/constants.shedulingConfigType.js";
import establishmentStatus from "../constants/constants.establishmentStatus.js";


const establishmentSchema = new mongoose.Schema({
  establishmentCode: {
    type: String,
    required: true, 
    unique: true,
   default: ()=> Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: false,
    default: null
  },
  businessCategory: {
    type: String,
    enum: businessCategories.map(category => category.category),
    required: true,
    default: null
  },
  schedulingConfigType: {
    type: String,
    enum: schedulingConfigType.map(shedulingConfigType => shedulingConfigType.type),
    required: true,
    default: null,
  },
  status: { 
    type: String, 
    enum: establishmentStatus.map(status => status.status),
    default: "pendingData"
  },
  hasOnlyBranch: {
    type: Boolean,
    required: true,
    default: false
  },
  hasEmployees: {
    type: Boolean,
    required: true,
    default: false
  },
  name: {
    type: String,
    required: false,
    default: null
  },
  description: {
    type: String,
    required: false,
    default: null
  },
  logoUrl: {
    type: String,
    required: false,
    default: null,
  },
  phoneNumbers: {
    type: [String],
    required: false,
    default: [],
  },
  email: {
    type: String,
    required: false,
    default: null,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
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
  customersCounter: {
    type: Number,
    required: true,
    default: 0,
  },
  employeesCounter: {
    type: Number,
    required: true,
    default: 0,
  },
});

establishmentSchema.virtual("owner", {
  ref: 'Owner',
  localField: 'ownerId',
  foreignField: '_id',
  justOne: true
});

const modelName = "Establishment";
const Establishment = mongoose.model(modelName, establishmentSchema);

export default Establishment
