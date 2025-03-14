import mongoose from "mongoose";
import { formatDoc } from "../config/database.plugins.js";

const userSchema = new mongoose.Schema({
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
  companies: {
    type: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    }],
    required: false,
    default: []
  },


  });

userSchema.plugin(formatDoc)

//Automatizacion de populates en consultas create/save.
/*
userSchema.post("save", async function(doc, next) {
  await doc.populate(["companies"])
  next();
});
*/

//Automatizacion de populates en consultas find()
userSchema.pre(/^find/, function(next) {
  this.populate(["companies"]);
  next();
});


const modelName = "User";
const User = mongoose.model(modelName, userSchema);

export default User