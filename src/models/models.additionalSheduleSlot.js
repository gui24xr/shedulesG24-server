import mongoose from "mongoose";

const additionalSheduleSlotSchema = new mongoose.Schema({
  sheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shedule",
    default: null,
  },
  startDateTime: {
    type: Date,
    required: true,
    default: new Date(),
  },
  priority: { 
    type: String, 
    enum: ["normal", "urgent", "critical"],
  },
  bookings: {
    currentBookingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      default: null,
    },
    canceledBookingsId: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Booking" }],
      default: null,
    },
  },
});

const modelName = "additionalSheduleSlot";
const AdditionalSheduleSlot = mongoose.model(modelName, additionalSheduleSlotSchema);

export default AdditionalSheduleSlot;
