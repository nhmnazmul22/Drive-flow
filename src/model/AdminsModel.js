// ===== External Imports =====
import mongoose from "mongoose";

// ===== Define Data Schema =====
const DataSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    img: { type: String, required: true },
    about: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false, required: true },
    otp: { type: String, default: ".", required: true },
    password: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

// ===== Define Model =====
const AdminsModel = mongoose.model("admins", DataSchema);

// ===== export Model =====
export default AdminsModel;
