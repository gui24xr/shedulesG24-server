import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
  authProvider: { 
    type: String, 
    enum: ['local', 'auth0'], 
    required: true 
  },
  email: {
    type: String,
    required: true,  
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,  // 
  },
  role: {
    type: String,
    enum: ["dev", "provider", "customer", "company","admin"], 
    default: "company",
  },
  userName: {
    type: String,
    required: true,  
    unique: false, 
  },
  firstName: {
    type: String,
    required: true,  
    unique: false, 
  },
  lastName: {
    type: String,
    required: true,  
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






const modelName = "User";
const User = mongoose.model(modelName, userSchema);

export default User