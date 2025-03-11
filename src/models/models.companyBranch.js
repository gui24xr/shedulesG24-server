import mongoose from "mongoose";
import { formatDoc } from "../config/database.plugins.js";

const companyBranchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyId:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Company',
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
  
});

companyBranchSchema.plugin(formatDoc)

companyBranchSchema.virtual("company", {
  ref: 'Company',
  localField: 'companyId',
  foreignField: '_id',
  justOne: true
});

//Automatizacion de populates en consultas create/save.
/*
companyBranchSchema.post("save", async function(doc, next) {
  await doc.populate("company")
  next();
});
*/

//Automatizacion de populates en consultas find()
companyBranchSchema.pre(/^find/, function(next) {
  this.populate("company");
  next();
});

const modelName = "CompanyBranch";
const CompanyBranch = mongoose.model(modelName, companyBranchSchema);

export default CompanyBranch
