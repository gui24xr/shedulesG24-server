import mongoose from "mongoose";


const employeeSchema = new mongoose.Schema({
  userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false,
      default: null
    },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    default: null
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: false,
  },
  specialty: {
    type: String,
    required: false,
    default: null
  },
  phoneNumber: {
    type: String,  
    required: false,  
    default: null
  },
  email: {
    type: String,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,
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
