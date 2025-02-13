import mongoose from "mongoose";

const sheduleSchema = new mongoose.Schema({
  slots: [{
    startDateTime:{
        type: Date,
        required: true,
        default: new Date()
    },
    endDateTime:{
        type: Date,
        required: true
    },
    durationInMinutes:{
      type: Number,
      required: true,
      default: 0
  },
  bookings:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  }]
  }],
  
  additionalSlots:[{
    startDateTime:{
      type: Date,
      required: true,
      default: new Date()
  },
   bookings:[{
     type: mongoose.Schema.Types.ObjectId,
     ref: "Booking",
   }]
  }],

  waitingList:[{
    customer:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
    possibleDates:[{
        type: Date,
    }],
    status: {
      type: String,
      enum: ["pending", "completed", "cancelled"], 
      default: "pending",
    },
  }]
});

const modelName = "Shedule";
export const Shedule = mongoose.model(modelName, sheduleSchema);
