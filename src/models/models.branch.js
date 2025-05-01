import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
  establishmentId:{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Establishment',
    default: null,
    required: false
  },
  name: {
    type: String,
    required: true,
  },
  onService: {
    type: Boolean,
    required: true,
    default: false,
  },
});

branchSchema.virtual('location',{
  ref: 'Location',
  localField: '_id',
  foreignField: 'branchId',
  justOne: true
})

/*
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
*/
const modelName = "Branch";
const Branch = mongoose.model(modelName, branchSchema);

export default Branch
