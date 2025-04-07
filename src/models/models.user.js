import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
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
   companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
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

userSchema.index({ email: 1, role: 1, companyId: 1 }, { unique: true });


userSchema.virtual("company", {
  ref: 'Company',
  localField: 'companyId',
  foreignField: '_id',
  justOne: true
});


const modelName = "User";
const User = mongoose.model(modelName, userSchema);

export default User