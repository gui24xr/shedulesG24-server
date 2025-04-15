import mongoose from "mongoose";


const providedServiceSchema = new mongoose.Schema({
  establishmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Establishment",
    default: null
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  employeeId:{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    default: null
  }, 
  sheduleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Shedule",
    default: null
  },
  
  branchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: true,
    default: null,
  },
  notificationsConfigId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "notificationsConfig",
    default: null
  }
});




providedServiceSchema.virtual("establishment", {
  ref: 'Establishment',
  localField: 'establishmentId',
  foreignField: '_id',
  justOne: true
});

providedServiceSchema.virtual("employee", {
  ref: 'Employee',
  localField: 'employeeId',
  foreignField: '_id',
  justOne: true
});

providedServiceSchema.virtual("branch", {
  ref: 'Branch',
  localField: 'branchId',
  foreignField: '_id',
  justOne: true
});

providedServiceSchema.virtual("notificationsConfig", {
  ref: 'NotificationsConfig',
  localField: 'notificationsConfigId',
  foreignField: '_id',
  justOne: true
});

//Automatizacion de populates en consultas create/save.
/*
providedServiceSchema.post("save", async function(doc, next) {
  await doc.populate(["company","provider","companyBranch","notificationsConfig"])
  next();
});
*/
//Automatizacion de populates en consultas find()
providedServiceSchema.pre(/^find/, function(next) {
  this.populate(["establishment","employee","branch","notificationsConfig"]);
  next();
});

const modelName = "ProvidedService";
const providedService = mongoose.model(modelName, providedServiceSchema);

export default providedService
