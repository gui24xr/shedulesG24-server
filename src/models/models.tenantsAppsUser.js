import mongoose from "mongoose";


const tenantsAppsUserSchema = new mongoose.Schema({
  authProvider: { 
    type: String, 
    enum: ['local', 'auth0'], 
    required: true 
  },
  email: {
    type: String,
    required: false,  
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,  // 
  },
  establishmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Establishment",
    required: false,
    default: null
  },
  role: {
    type: String,
    enum: ["dev", "owner", "admin", "customer", "employee" ,], 
    default: "admin",
  },
  userName: {
    type: String,
    required: false,  
    unique: false, 
  },
  password: {
    type: String,
    required: false, 
    minlength: 6,  
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

  tenantsAppsUserSchema.index({ email: 1, establishmentId: 1 }, { unique: true });

tenantsAppsUserSchema.virtual("profile", {
  ref: 'Profile',
  localField: 'profileId',
  foreignField: '_id',
  justOne: true
});

tenantsAppsUserSchema.virtual("establishment", {
  ref: 'Establishment',
  localField: 'establishmentId',
  foreignField: '_id',
  justOne: true
});

//Automatizacion de populates en consultas find()
tenantsAppsUserSchema.pre(/^find/, function(next) {
  this.populate("establishment");
  next();
});

const modelName = "TenantsAppsUser";
const TenantsAppsUser = mongoose.model(modelName, tenantsAppsUserSchema);

export default TenantsAppsUser