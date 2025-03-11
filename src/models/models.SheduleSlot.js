import mongoose from "mongoose";
import { formatDoc } from "../config/database.plugins.js";

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

sheduleSlotSchema.plugin(formatDoc)

sheduleSlotSchema.virtual("currentBooking", {
  ref: 'Booking',
  localField: 'currentBookingId',
  foreignField: '_id',
  justOne: true
});

//Automatizacion de populates en consultas create/save.
/*sheduleSlotSchema.post("save", async function(doc, next) {
  await doc.populate(["currentBooking","canceledBookings"])
  next();
});
*/

//Automatizacion de populates en consultas find()

sheduleSlotSchema.pre(/^find/, function(next) {
  this.populate(["currentBooking","canceledBookings"]);
  next();
});



const modelName = "SheduleSlot";
const SheduleSlot = mongoose.model(modelName, sheduleSlotSchema);

export default SheduleSlot;
