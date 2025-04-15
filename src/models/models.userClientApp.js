import mongoose from "mongoose";


const userClientAppSchema = new mongoose.Schema({
  authProvider: { 
    type: String, 
    enum: ['local', 'auth0'], 
    required: true 
  },
  email: {
    type: String,
    required: false,  
    match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/,  // 
  },
  establishmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Establishment",
    required: false,
    default: null
  },
  role: {
    type: String,
    enum: ["dev", "owner", "admin", "customer", "employee" ,], 
    default: "admin",
  },
  userName: {
    type: String,
    required: false,  
    unique: false, 
  },
  password: {
    type: String,
    required: false, 
    minlength: 6,  
  },
  profilePicture: {
    type: String,
    required: false,  
    default: null,
  },
  enabled: {
    type: Boolean,
    required: true,
    default: true
  },
  lastLogin:{
    type: Date,
    default: new Date()
  },
 


  });

  userClientAppSchema.index({ email: 1, establishmentId: 1 }, { unique: true });



userClientAppSchema.virtual("establishment", {
  ref: 'Establishment',
  localField: 'establishmentId',
  foreignField: '_id',
  justOne: true
});

//Automatizacion de populates en consultas find()
userClientAppSchema.pre(/^find/, function(next) {
  this.populate("establishment");
  next();
});

const modelName = "UserClientApp";
const UserClientApp = mongoose.model(modelName, userClientAppSchema);

export default UserClientApp