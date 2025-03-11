import mongoose from "mongoose";
import { formatDoc } from "../config/database.plugins.js";

const companySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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
    default: null,
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
  providedServices: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProvidedService",
      default: [],
    },
  ],

  branchs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CompanyBranch",
      default: [],
    },
  ],

  customersCounter: {
    type: Number,
    required: true,
    default: 0,
  },

  customers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      default: [],
    },
  ],
});

companySchema.plugin(formatDoc)

companySchema.virtual("user", {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

//Automatizacion de populates en consultas create/save.
/*
companySchema.post("save", async function(doc, next) {
  await doc.populate(["user","providedServices","branchs"])
});
*/

//Automatizacion de populates en consultas find()
companySchema.pre(/^find/, function(next) {
  this.populate(["user","providedServices","branchs"]);
  next();
});

const modelName = "Company";
const Company = mongoose.model(modelName, companySchema);

export default Company
