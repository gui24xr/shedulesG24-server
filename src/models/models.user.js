import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,  
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,  // 
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
  companies: {
    type: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    }],
    required: false,
    default: []
  },

  

  });

const modelName = "User";
const User = mongoose.model(modelName, userSchema);

export default User