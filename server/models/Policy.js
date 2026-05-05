import mongoose from "mongoose";

const policySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      unique: true, // refund, privacy, terms
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Policy = mongoose.model("Policy", policySchema);

export default Policy;