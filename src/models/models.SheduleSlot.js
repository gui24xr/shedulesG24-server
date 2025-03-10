import mongoose from "mongoose";

const sheduleSlotSchema = new mongoose.Schema({
  sheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shedule",
    default: null,
  },
  type: { 
    type: String, 
    enum: ["regular", "additional", "urgent"],
    default: "regular"
  },
  priority: { 
    type: String, 
    enum: ["low", "medium", "high", "veryHigh"],
    default: "normal"
  },
  startDateTime: {
    type: Date,
    required: true,
    default: new Date(),
  },
  endDateTime: {
    type: Date,
    required: true,
  },
  durationInMinutes: {
    type: Number,
    required: true,
    default: 0,
  },
  currentBookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
  },
  canceledBookings: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
      default: null,
    },
    
});

const modelName = "SheduleSlot";
const SheduleSlot = mongoose.model(modelName, sheduleSlotSchema);

export default SheduleSlot;
