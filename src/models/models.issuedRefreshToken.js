import mongoose from 'mongoose'

const issuedRefreshTokenSchema = new mongoose.Schema({
    tokenId: {
      type: String,        
      required: true,
      unique: true,
    },
    tenantUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
    hashedToken: {
      type: String,        
      required: true,
    },
    device: {
      type: String,        
      default: 'Unknown',
    },
    ip: {
      type: String,
    },
    userAgent: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    revoked: {
      type: Boolean,
      default: false,
    },
    revokedAt: {
      type: Date,
    }
  });
  
  const modelName = "IssuedRefreshToken";
  const issuedRefreshToken = mongoose.model(modelName, issuedRefreshTokenSchema);

  export default issuedRefreshToken;
  
