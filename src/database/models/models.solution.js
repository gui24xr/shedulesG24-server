import mongoose from "mongoose";

const solutionSchema = new mongoose.Schema({
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  agent: {
    name: {
      type: String,
      required: false,
    },
    lastName: {
      type: String,
      required: false,
    },
  },
});

const modelName = "Solution";
export const Solution = mongoose.model(modelName, solutionSchema);
