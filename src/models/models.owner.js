import mongoose from "mongoose";


const ownerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: false,  
    unique: true,
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,  // 
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    default: null
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
    default: null
  },
  status: { 
    type: String, 
    enum: ["active", "inactive","needs_profile_completion"],
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
  phoneNumber: {
    type: String,  
    required: false,  
    default: null
  },

});



ownerSchema.virtual("user", {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id',
    justOne: true
  });

ownerSchema.virtual("company", {
ref: 'Company',
localField: 'companyId',
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
ownerSchema.pre(/^find/, function(next) {
  this.populate(["company"]);
  next();
});



const modelName = "Owner";
const Owner = mongoose.model(modelName, ownerSchema);

export default Owner;
