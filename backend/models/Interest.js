import mongoose from "mongoose";

const interestSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    clothingId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clothing",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Interest", interestSchema);