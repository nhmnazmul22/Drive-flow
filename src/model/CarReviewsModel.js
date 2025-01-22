// ===== External Imports =====
import mongoose from "mongoose";

// ===== Define ratingProgress Schema =====
const ratingProgressSchema = new mongoose.Schema({
  cleanliness: { type: Number, required: true },
  maintenance: { type: Number, required: true },
  communication: { type: Number, required: true },
  convenience: { type: Number, required: true },
  accuracy: { type: Number, required: true },
});

// ===== Define Data Schema =====
const DataSchema = new mongoose.Schema(
  {
    rating: { type: Number, required: true },
    ratingProgress: { type: ratingProgressSchema, required: true },
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
