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
  defaultBranchId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Branch",
    required: false,
    default: null,
  },
  notificationsConfig: {
    type: {
      email: { type: Boolean, default: false }, 
      sms: { type: Boolean, default: false },
      push: { type: Boolean, default: false },
      whatsapp: { type: Boolean, default: false },
    },
    required: false,
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
  localField: 'defaultBranchId',
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
  this.populate(["establishment","employee","defaultBranch"]);
  next();
});

const modelName = "ProvidedService";
const providedService = mongoose.model(modelName, providedServiceSchema);

export default providedService
