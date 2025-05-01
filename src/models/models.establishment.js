import mongoose from "mongoose";
import establishmentStatus from "../constants/constants.establishmentStatus.js";

const establishmentSchema = new mongoose.Schema({
  establishmentCode: {
    type: String,
    required: true, 
    unique: true,
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Owner",
    required: false,
    default: null
  },  
  status: { 
    type: String, 
    enum: establishmentStatus.map(status => status.status),
    default: "pendingData"
  },
  name: {
    type: String,
    required: false,
    default: null
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
  contactPhones: {
    type: [String],
    required: false,
    default: [],
  },
  contactEmails: {
      type: [String],
      required: false,
      default: [],
    },
  customersCounter: {
    type: Number,
    required: true,
    default: 0,
  },
  employeesCounter: {
    type: Number,
    required: true,
    default: 0,
  },
  
});

establishmentSchema.virtual("owner", {
  ref: 'Owner',
  localField: 'ownerId',
  foreignField: '_id',
  justOne: true
});



//No molesta xq si no no lo quiero usar no hago el populate


establishmentSchema.virtual('locationsBook',{
  ref: 'Location',
  localField: '_id',
  foreignField: 'establishmentId',
  justOne: false
})

establishmentSchema.virtual("employees", {
  ref: 'Employee',
  localField: '_id',
  foreignField: 'establishmentId',
  justOne: false
});

establishmentSchema.virtual('establishmentConfig',{
  ref: 'EstablishmentConfig',
  localField: '_id',
  foreignField: 'establishmentId',
  justOne: true
})






const modelName = "Establishment";
const Establishment = mongoose.model(modelName, establishmentSchema);

export default Establishment
