import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  dni: {
    type: String,
    required: false,
  },
  customerNumber:{
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  lastName: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,  
    required: true,  // Es obligatorio tener al menos un número de teléfono
  },
  email: {
    type: String,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    required: false,  // El email no es obligatorio
  },
});

const modelName = "Customer";
export const Customer = mongoose.model(modelName, customerSchema);
