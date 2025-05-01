import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
    phoneNumber: {
      type: String,
      required: false,
      default: null
    },
    email: {
      type: String,
      required: false,
      default: null,
      match: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    },
    firstName: {
      type: String,
      required: false,
      default: null
    },
    lastName: {
      type: String,
      required: false,
      default: null
    },
    profilePicture: {
      type: String,
      required: false,
      default: null
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Owner',
      required: false,
      default: null
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: false,
      default: null
    },
    tenantsAppsUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TenantsAppsUser',
      required: false,
      default: null
    }
  
});


profileSchema.virtual('status').get(function () {
  if (this.firstName && this.lastName && this.phoneNumber && this.email) {
    return 'completed';
  }
  return 'pendingData';
});


const modelName = "Profile";
const Profile = mongoose.model(modelName, profileSchema);

export default Profile;
