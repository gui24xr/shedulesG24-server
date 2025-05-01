import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    establishmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Establishment',
        required: false,
        default: null,
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: false,
        default: null,
    },
    location: {
    type: {
      street: { type: String, required: false, default: null },
      streeNumber: { type: String, required: false, default: null },
      floor: { type: String, required: false, default: null },
      apartment: { type: String, required: false, default: null },
      city: { type: String, required: false, default: null },
      postalCode: { type: String, required: false, default: null },
      state: { type: String, required: false, default: null },
      country: { type: String, required: false, default: null },
      latitude: { type: Number, required: false, default: null },
      longitude: { type: Number, required: false, default: null },
    },
    default: null,  
  },
        
})

locationSchema.virtual('status').get(function(){
    if(!this.location) return 'pendingData'
    return 'ok'
})

const modelName = "Location";
const Location = mongoose.model(modelName, locationSchema);

export default Location;

