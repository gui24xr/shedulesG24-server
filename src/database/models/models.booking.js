import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  solution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Solution",
  },
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "completed", "cancelled"], 
    default: "pending",
  },
  scheduledAt: {
    type: Date,  // Fecha y hora combinadas
    required: true,  // El campo es obligatorio
  },
  duration: {
    type: Number,
    required: true,
  },
  notes: {
    type: String,
    required: false,
  },
});

const modelName = "Booking";
export const Booking = mongoose.model(modelName, bookingSchema);
