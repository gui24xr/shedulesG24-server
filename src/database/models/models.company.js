import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  profile: {
    name: {
      type: String,
      required: true,
    },
    logoUrl: {
      type: String,
      required: false,
      default: null,
    },
    location: {
      street: {
        type: String,
        required: false,
        default: null,
      },
      streetNumber: {
        type: String,
        required: false,
        default: null,
      },
      floor: {
        type: String,
        required: false,
        default: null,
      },
      apartment: {
        type: String,
        required: false,
        default: null,
      },
      state: {
        type: String,
        required: false,
        default: null,
      },
      country: {
        type: String,
        required: false,
        default: null,
      },
      postalCode: {
        type: String,
        required: false,
        default: null,
      },
      coordinates: {
        type: [Number], // Un array de dos números: [longitud, latitud]
        required: false,
        default:null
      },
    },
    contactData: {
      phonesNumbers: {
        type: [String],
        required: false,
        default: [],
      },
      email: {
        type: String,
        required: true,
        match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
        default:null
      },
    },
  },
  
  businessData: {
    whatsappNumbers: {
      type: [String],
      required: false,
      default: []
    },
    email: {
      type: String,
      required: false,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
      default:null
    },
  },

  offerings:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    default: []
  }],

  customersCounter:{
    type: Number,
    required: true,
    default : 0
  },

  customers:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    default: []
  }]
});

const modelName = "Company";
export const Company = mongoose.model(modelName, companySchema);
