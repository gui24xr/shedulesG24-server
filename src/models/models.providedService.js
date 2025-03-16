import mongoose from "mongoose";


const providedServiceSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyBranch",
    default: null
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
  
  companyBranchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CompanyBranch",
    default: null
  },
  notificationsConfigId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "notificationsConfig",
    default: null
  }
});




providedServiceSchema.virtual("company", {
  ref: 'Company',
  localField: 'companyId',
  foreignField: '_id',
  justOne: true
});

providedServiceSchema.virtual("employee", {
  ref: 'Employee',
  localField: 'employeeId',
  foreignField: '_id',
  justOne: true
});

providedServiceSchema.virtual("companyBranch", {
  ref: 'CompanyBranch',
  localField: 'companyBranchId',
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
  this.populate(["company","employee","companyBranch","notificationsConfig"]);
  next();
});

const modelName = "ProvidedService";
const providedService = mongoose.model(modelName, providedServiceSchema);

export default providedService
