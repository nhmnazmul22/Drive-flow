// ===== External Imports =====
import mongoose from "mongoose";

// ===== Define Data Schema =====
const DataSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  feedback: { type: String, required: true },
  userID: { type: mongoose.Types.ObjectId, required: true },
  hosterID: { type: mongoose.Types.ObjectId, required: true },
});

// ===== Define Model =====
const HostReviewsModel = mongoose.model("hostreviews", DataSchema);

// ===== export Model =====
export default HostReviewsModel;
