import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  establishmentId:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Establishment',
    default: null,
    required: false
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
});

branchSchema.virtual("establishment", {
  ref: 'Establishment',
  localField: 'establishmentId',
  foreignField: '_id',
  justOne: true
});

//Automatizacion de populates en consultas find()
branchSchema.pre(/^find/, function(next) {
  this.populate("establishment");
  next();
});

const modelName = "Branch";
const Branch = mongoose.model(modelName, branchSchema);

export default Branch
