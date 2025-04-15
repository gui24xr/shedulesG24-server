import mongoose from "mongoose";


const customerSchema = new mongoose.Schema({
  userClientAppId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserClientApp",
      required: false,
      default: null
    },
  dni: {
    type: String,
    required: true,
  },
  customerNumber:{
    type: String,
    required: false,
    default: null
  },
  establishmentId:{
      type: mongoose.Schema.Types.ObjectId, 
      default: null,
      ref:'Establishment',
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

customerSchema.virtual("userClientApp", {
  ref: 'UserClientApp',
  localField: 'userClientAppId',
  foreignField: '_id',
  justOne: true
});

//Automatizacion de populates en consultas find()
customerSchema.pre(/^find/, function(next) {
  this.populate("userClientApp");
  next();
});

const modelName = "Customer";
const Customer = mongoose.model(modelName, customerSchema);

export default Customer
