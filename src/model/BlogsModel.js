// ===== External Imports =====
import mongoose from "mongoose";

// ===== Define Data Schema =====
const DataSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    shortDes: { type: String, required: true },
    description: { type: String, required: true },
    blogImg: { type: String, required: true },
    tags: { type: [String], required: true },
    category: { type: String, required: true },
    writerID: { type: mongoose.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false }
);

// ===== Define Model =====
const BlogsModel = mongoose.model("blogs", DataSchema);

// ===== export Model =====
export default BlogsModel;
