import mongoose from "mongoose";


const pendingEmployeeUserSchema = new mongoose.Schema({
  establishmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Establishment",
    required: false,
    default: null
  },
  employeeRecord: {
    type: String,
    required: true,  
    unique: false, 
  },
  activationCode: {
    type: String,
    required: true,  
    unique: false, 
  },
  role: {
    type: String,
    enum: [ "admin","employee" ], 
    default: "admin",
  },
  expirationDate:{
    type: Date,
    default: new Date()
  },
  status: {
    type: String,
    enum: ["pending", "completed"], 
    default: "pending",
  },
 


  });






const modelName = "PendingEmployeeUser";
const PendingEmployeeUser = mongoose.model(modelName, pendingEmployeeUserSchema);

export default PendingEmployeeUser