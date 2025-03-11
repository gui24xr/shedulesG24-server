import mongoose from "mongoose";
import { formatDoc } from "../config/database.plugins.js";

const sheduleSchema = new mongoose.Schema({
 providedServiceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProvidedService",
    required: false,
    default: null
 },
 companyId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Company",
  required: false,
  default: null
},
  slots: {
    type: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "SheduleSlot"
    }],
    required: false,
    default: []
  },
  additionalsSlots: {
    type: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdditionalSheduleSlot"
    }],
    required: false,
    default: []
  },
  waitingListId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "WaitingList",
     required: false,
     default: null
  }

})
 
sheduleSchema.plugin(formatDoc)

sheduleSchema.virtual("providedService", {
  ref: 'ProvidedService',
  localField: 'providedServiceId',
  foreignField: '_id',
  justOne: true
});

//Automatizacion de populates en consultas create/save.
/*
sheduleSchema.post("save", async function(doc, next) {
  await doc.populate(["providedService"])
  next();
  */

//Automatizacion de populates en consultas find()
sheduleSchema.pre(/^find/, function(next) {
  this.populate(["providedService"]);
  next();
});



const modelName = "Shedule";
const Shedule = mongoose.model(modelName, sheduleSchema);

export default Shedule


