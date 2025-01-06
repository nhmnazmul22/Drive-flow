// ===== External Imports =====
import mongoose from "mongoose";

// ===== Define Data Schema =====
const DataSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

// ===== Define Model =====
const TypesModel = mongoose.model("types", DataSchema);

// ===== export Model =====
export default TypesModel;
