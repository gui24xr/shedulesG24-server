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
  sheduleInfo: 
    {
      sheduleId: {type: mongoose.Schema.Types.ObjectId, default: null, required: false,},
      slotId: {type: mongoose.Schema.Types.ObjectId, default: null,required: false,}
    }
  ,
  notes: {
    type: String,
    required: false,
  },
});

const modelName = "Booking";
export const Booking = mongoose.model(modelName, bookingSchema);
