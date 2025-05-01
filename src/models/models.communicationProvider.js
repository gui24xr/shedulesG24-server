import mongoose from "mongoose";

const communicationProviderSchema = new mongoose.Schema({
    establishmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Establishment",
        required: true
    },
    name: {
        type: String,
        required: false,
        default: null,
        trim: true,
        maxlength: 100
      },      
    type: {
        type: String,
        enum: ["whatsapp", "email", "sms"],
        required: true
      },
    contact: {
        type: String, // emailAddress o phoneNumber, dependiendo del canal
        required: false,
        default: null
    },
    verified: {
        type: Boolean,
        required: true,
        default: false // o true para SMS si querés por defecto
    },
    status: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending"
    },
    verifiedAt: {
        type: Date,
        default: null // o Date.now si querés marcar automático (SMS)
    },
    verificationToken: { // solo usado en email, opcional
        type: String,
        default: null
    },
    providerId: { // si aplica para whatsapp o sms con proveedores externos
        type: String,
        default: null
    },
    rejectionReason: {
        type: String,
        default: null
    }
})

const communicationProviders = mongoose.model("CommunicationProvider", communicationProviderSchema);

export default communicationProviders;


