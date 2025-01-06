// ===== External Imports =====
import mongoose from "mongoose";

// ===== Define Data Schema =====
const DataSchema = new mongoose.Schema(
  {
    icon: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

// ===== Define Model =====
const ServicesModel = mongoose.model("services", DataSchema);

// ===== export Model =====
export default ServicesModel;
