import mongoose from "mongoose";


const companySchema = new mongoose.Schema({
  companyCode: {
    type: String,
    required: true,
  },
  status: { 
    type: String, 
    enum: ["active", "inactive","pending_data"],
    default: "active"
  },
  name: {
    type: String,
    required: true,
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
    required: true,
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



const modelName = "Company";
const Company = mongoose.model(modelName, companySchema);

export default Company
