import mongoose from "mongoose";
import { formatDoc } from "../config/database.plugins.js";

const bookingSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
    default: null
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"], 
    default: "pending",
  },
  scheduledAt: {
    type: Date,  
    required: true, 
    default: Date.now()
  },
  sheduleId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:'Shedule', 
    default: null, 
    required: false,
  },
  slotId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:'Shedule.Slot', 
    default: null,
    required: false,
  },
  note: {
    type: String,
    required: false,
    default: null
  },

});


bookingSchema.plugin(formatDoc)

bookingSchema.virtual("customer", {
  ref: 'Customer',
  localField: 'customerId',
  foreignField: '_id',
  justOne: true
});

//Automatizacion de populates en consultas create/save.
/*
bookingSchema.post("save", async function(doc, next) {
  await doc.populate("customer")
  next();
});
*/

//Automatizacion de populates en consultas find()
bookingSchema.pre(/^find/, function(next) {
  this.populate("customer");
  next();
});

const modelName = "Booking";
const Booking = mongoose.model(modelName, bookingSchema);

export default Booking


