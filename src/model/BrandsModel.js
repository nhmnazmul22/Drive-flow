// ===== External Imports =====
import mongoose from "mongoose";

// ===== Define Data Schema =====
const DataSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

// ===== Define Model =====
const BrandsModel = mongoose.model("brands", DataSchema);

// ===== export Model =====
export default BrandsModel;
