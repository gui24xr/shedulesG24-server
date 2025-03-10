import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  customer: {
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

const modelName = "Booking";
const Booking = mongoose.model(modelName, bookingSchema);

export default Booking


