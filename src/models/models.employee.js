import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema({
  establishmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Establishment",
    required: true,
    default: null
  },
  tenantsAppUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TenantsAppUser",
    required: false,
    default: null
  },
  employeeRecord: {
    type: String,
    required: false,
    default: null
  },
  status: { 
    type: String, 
    enum: ["active", "inactive"],
    default: "active"
  },
  
    
});







employeeSchema.virtual("profile", {
  ref: 'Profile',
  localField: '_id',
  foreignField: 'employeeId',
  justOne: true
});

employeeSchema.virtual("workProfileData", {
  ref: 'WorkProfileData',
  localField: '_id',
  foreignField: 'employeeId',
  justOne: true
});

employeeSchema.virtual("establishment", {
  ref: 'Establishment',
  localField: 'establishmentId',
  foreignField: '_id',
  justOne: true
});
/*
employeeSchema.virtual("tenantsAppUser", {
  ref: 'TenantsAppUser',
  localField: 'tenantsAppUserId',
  foreignField: '_id',
  justOne: true
});
*/
//Automatizacion de populates en consultas create/save.
/*
providerSchema.post("save", async function(doc, next) {
  await doc.populate(["company","providedServices"])
  next();
});
*/

//Automatizacion de populates en consultas find()
/*
employeeSchema.pre(/^find/, function(next) {
    this.populate(["tenantsAppUser  ","establishment"]);
  next();
});

*/

const modelName = "Employee";
const Employee = mongoose.model(modelName, employeeSchema);

export default Employee;
