import mongoose from "mongoose";


const ownerSchema = new mongoose.Schema({
  authProvider: { 
    type: String, 
    enum: ['local', 'auth0'], 
    required: true 
  },
  email: {
    type: String,
    required: false,  
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,  // 
  },
  status: { 
    type: String, 
    enum: ["active", "inactive","pendingData"],
    default: "pendingData"
  },
  firstName: {
    type: String,
    required: false,
    default: null
  },
  lastName: {
    type: String,
    required: false,
    default: null
  },
  phoneNumber: {
    type: String,  
    required: false,  
    default: null
  },
  profilePicture: {
    type: String,
    required: false,  
    default: null,
  },
  enabled: {
    type: Boolean,
    required: true,
    default: true
  },
  lastLogin:{
    type: Date,
    default: new Date()
  },
});


ownerSchema.virtual("companies", {
  ref: 'Company',
  localField: '_id',
  foreignField: 'ownerId',
  justOne: false
});



//Automatizacion de populates en consultas create/save.
/*
providerSchema.post("save", async function(doc, next) {
  await doc.populate(["company","providedServices"])
  next();
});
*/





const modelName = "Owner";
const Owner = mongoose.model(modelName, ownerSchema);

export default Owner;
