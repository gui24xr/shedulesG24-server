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
    enum: ["active", "inactive"],
    default: "active"
  },
  lastLogin:{
    type: Date,
    default: new Date()
  },
});




ownerSchema.virtual("profile", {
  ref: 'Profile',
  localField: '_id',
  foreignField: 'ownerId',
  justOne: true
});



ownerSchema.virtual("establishments", {
  ref: 'Establishment',
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
