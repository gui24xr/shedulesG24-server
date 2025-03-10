import mongoose from "mongoose";

const providerSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyBranch",
    default: null
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  specialty: {
    type: String,
    required: false,
    default: null
  },
  phoneNumber: {
    type: String,  
    required: false,  
    default: null
  },
  email: {
    type: String,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    required: false,  // El email no es obligatorio
    default: null
  },
  providedServices:{
    type :[{ type: mongoose.Schema.Types.ObjectId,ref: "ProvidedService"}],
    default: []
  }, 
});

const modelName = "Provider";
const Provider = mongoose.model(modelName, providerSchema);

export default Provider
