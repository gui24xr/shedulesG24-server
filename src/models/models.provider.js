import mongoose from "mongoose";
import { formatDoc } from "../config/database.plugins.js";

const providerSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
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
    required: false,  
    default: null
  },
  providedServices:{
    type :[{ type: mongoose.Schema.Types.ObjectId,ref: "ProvidedService"}],
    default: []
  }, 
});

providerSchema.plugin(formatDoc)

providerSchema.virtual("company", {
  ref: 'Company',
  localField: 'companyId',
  foreignField: '_id',
  justOne: true
});

//Automatizacion de populates en consultas create/save.
/*
providerSchema.post("save", async function(doc, next) {
  await doc.populate(["company","providedServices"])
  next();
});
*/

//Automatizacion de populates en consultas find()
providerSchema.pre(/^find/, function(next) {
  this.populate(["company","providedServices"]);
  next();
});



const modelName = "Provider";
const Provider = mongoose.model(modelName, providerSchema);

export default Provider;
