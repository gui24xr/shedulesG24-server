import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    default: null
  },
  employeeRecord: {
    type: String,
    required: false,
    default: null
  },
  specialty: {
    type: String,
    required: false,
    default: null
  },
  category: { 
    type: String, 
    enum: ["admin", "operative",],
    default: "admin"
  },
  status: { 
    type: String, 
    enum: ["active", "inactive"],
    default: "active"
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
    default: null,
  },
  phoneNumber: {
    type: String,  
    required: false,  
    default: null
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
    default: null
  },
  
});



employeeSchema.virtual("company", {
  ref: 'Company',
  localField: 'companyId',
  foreignField: '_id',
  justOne: true
});

employeeSchema.virtual("user", {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true
});

//Automatizacion de populates en consultas create/save.
/*
providerSchema.post("save", async function(doc, next) {
  await doc.populate(["company","providedServices"])
  next();
});
*/

//Automatizacion de populates en consultas find()
employeeSchema.pre(/^find/, function(next) {
  this.populate(["user","company"]);
  next();
});



const modelName = "Employee";
const Employee = mongoose.model(modelName, employeeSchema);

export default Employee;
