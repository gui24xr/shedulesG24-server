import mongoose from "mongoose";

const WaitingListSchema = new mongoose.Schema({
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

const modelName = "WaitingList";
const WaitingList = mongoose.model(modelName, WaitingListSchema);

export default WaitingList;
