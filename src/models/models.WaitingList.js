import mongoose from "mongoose";
import { formatDoc } from "../config/database.plugins.js";

const waitingListSchema = new mongoose.Schema({
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

waitingListSchema.plugin(formatDoc)



//Automatizacion de populates en consultas create/save.
/*
waitingListSchema.post("save", async function(doc, next) {
  await doc.populate([])
  next();
});
*/

//Automatizacion de populates en consultas find()
waitingListSchema.pre(/^find/, function(next) {
  this.populate(["items.customerId"]);
  next();
});

const modelName = "WaitingList";
const WaitingList = mongoose.model(modelName, waitingListSchema);

export default WaitingList;
