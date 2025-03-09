import mongoose from "mongoose";

const sheduleWaitingListSchema = new mongoose.Schema({
  sheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shedule",
    default: null,
  },
  items:{
    type: [{
        customerId:{
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
      }],
      
      default:[]
  }
});

const modelName = "SheduleWaitingSlot";
const SheduleWaitingList = mongoose.model(modelName, sheduleWaitingListSchema);

export default SheduleWaitingList;
