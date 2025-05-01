import mongoose from 'mongoose';
import employeeTypes from '../constants/constants.employeeTypes.js'


const workProfileDataSchema = new mongoose.Schema({
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    displayName: {
      type: String,
      required: true
    },
    type: { 
      type: String, 
      enum: employeeTypes.map(type => type.type),
      default: "admin"
    },
    functions: {
      type: [String],
      required: false,
      default: []
     },
    phoneNumber: {
      type: String,
      required: false,
      default: null
    },
    email: {
      type: String,
      required: false,
      default: null
    },
    profilePicture: {
      type: String,
      required: false,
      default: null
    },
  
    
  });

  workProfileDataSchema.virtual('status').get(function () {
    if (this.displayName && this.phoneNumber && this.email) {
      return 'completed';
    }
    return 'pendingData';
  });
  

  const WorkProfileData = mongoose.model('WorkProfileData', workProfileDataSchema);

  export default WorkProfileData;
   