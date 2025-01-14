// ===== External Imports =====
import mongoose from "mongoose";

// ===== Define Data Schema =====
const DataSchema = new mongoose.Schema(
  {
    rating: { type: String, required: true },
    feedback: { type: String, required: true },
    carID: { type: mongoose.Types.ObjectId, required: true },
    userID: { type: mongoose.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false }
);

// ===== Define Model =====
const CarReviewsModel = mongoose.model("carreviews", DataSchema);

// ===== export Model =====
export default CarReviewsModel;
