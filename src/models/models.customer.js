import mongoose from "mongoose";
import { formatDoc } from "../config/database.plugins.js";

const customerSchema = new mongoose.Schema({
  dni: {
    type: String,
    required: true,
  },
  customerNumber:{
    type: String,
    required: false,
    default: null
  },
  companyId:{
      type: mongoose.Schema.Types.ObjectId, 
      default: null,
      ref:'Company',
      required: false
    },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,  
    required: false,  
    default: null
  },
  email: {
    type: String,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    required: false,  // El email no es obligatorio
    default: null
  },
  bookings: {
      type: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking"
      }],
      required: false,
      default: []
    },
});

//CLAVE UNICA
customerSchema.index({ dni: 1, companyId: 1 }, { unique: true });

customerSchema.plugin(formatDoc)


const modelName = "Customer";
const Customer = mongoose.model(modelName, customerSchema);

export default Customer
