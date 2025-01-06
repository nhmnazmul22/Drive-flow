// ===== External Imports =====
import mongoose from "mongoose";

// ===== Define Data Schema =====
const DataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profession: { type: String, required: true },
    rating: { type: Number, required: true },
    feedback: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

// ===== Define Model =====
const TestimonialsModel = mongoose.model("testimonials", DataSchema);

// ===== export Model =====
export default TestimonialsModel;
