
/*
import mongoose from "mongoose";

const sheduleSchema = new mongoose.Schema({
  slots: [{
    startDateTime:{type: Date, required: true, default: new Date()},
    endDateTime:{type: Date, required: true},
    durationInMinutes:{type: Number, required: true, default: 0},
    bookings:{
      currentBooking:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        default: null
      },
      canceledBookings:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        default: []
      }]
    },  
  }], 
  overBookSlots:[{
    startDateTime:{
      type: Date,
      required: true,
      default: new Date()
    },
    priority: { 
      type: String, 
      enum: ["normal", "urgent", "critical"],
    },
    bookings:{
      currentBooking:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Booking",
        default: null
      },
      canceledBookings:[{
        id:{
          type: mongoose.Schema.Types.ObjectId
        },
        customer:{
          customerNumber:{
            type: String,
            required: false,
          },
          name: {
            type: String,
            required: false,
          },
          lastName: {
            type: String,
            required: false,
          },
        },
        canceledAt: {
          type: Date,
          default: Date.now,
        },
      }]
    },  
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
const Shedule = mongoose.model(modelName, sheduleSchema);

export default Shedule

*/