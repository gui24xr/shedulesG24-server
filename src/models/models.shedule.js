import mongoose from "mongoose";

const sheduleSchema = new mongoose.Schema({
 offeringId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offering",
    required: false,
    default: null
 },
 companyId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Company",
  required: false,
  default: null
},
  slots: {
    type: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "SheduleSlot"
    }],
    required: false,
    default: []
  },
  additionalsSlots: {
    type: [{ 
      type: mongoose.Schema.Types.ObjectId,
      ref: "AdditionalSheduleSlot"
    }],
    required: false,
    default: []
  },
  waitingListId: {
     type: mongoose.Schema.Types.ObjectId,
     ref: "WaitingList",
     required: false,
     default: null
  }

})
 


const modelName = "Shedule";
const Shedule = mongoose.model(modelName, sheduleSchema);

export default Shedule


