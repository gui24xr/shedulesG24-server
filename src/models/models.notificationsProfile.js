import mongoose from "mongoose";

const notificationsProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: null
  },
  establishmentId: { //Para indiicar a que establishment pertenece 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Establishment',
    required: false,
    default: null
  },
  whatsApp: {
    enabled: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      enum: ["automatic", "manual"],
      default: "automatic"
    },
    providerClient: {
      type: String,
      enum: ["saas", "establishment"],
      default: "saas"
    },
    communicationProviderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CommunicationProvider',
      required: false,
      default: null
    }
  },
  email: {
    enabled: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      enum: ["automatic", "manual"],
      default: "automatic"
    },
    providerClient: {
      type: String,
      enum: ["saas", "establishment"],
      default: "saas"
    },
    communicationProviderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CommunicationProvider',
      required: false,
      default: null
    }
  },
  sms: {
    enabled: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      enum: ["automatic", "manual"],
      default: "automatic"
    },
    providerClient: {
      type: String,
      enum: ["saas", "establishment"],
      default: "saas"
    },
    communicationProviderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CommunicationProvider',
      required: false,
      default: null
    }
  },

});


const modelName = "NotificationsProfile";
const NotificationsProfile = mongoose.model(modelName, notificationsProfileSchema);

export default NotificationsProfile
