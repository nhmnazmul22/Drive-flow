// ===== External Imports =====
import mongoose from "mongoose";

// ===== Define Education Schema =====
const educationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  university: { type: String, required: true },
  year: { type: String, required: true },
});

// ===== Define address Schema =====
const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zip: { type: String, required: true },
});

// ===== Define reviews Schema =====
const reviewsSchema = new mongoose.Schema({
  rating: { type: Number, required: true },
  feedback: { type: String, required: true },
  hosterID: { type: mongoose.Types.ObjectId, required: true },
});

// ===== Define Data Schema =====
const DataSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    img: { type: String, required: true },
    about: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    professions: { type: [String], required: true },
    language: { type: [String], required: true },
    rating: { type: Number, required: true },
    education: { type: educationSchema, required: true },
    address: { type: addressSchema, required: true },
    reviewsByHosts: { type: [reviewsSchema], required: true },
  },
  { timestamps: true, versionKey: false }
);

// ===== Define Model =====
const UsersModel = mongoose.model("users", DataSchema);

// ===== export Model =====
export default UsersModel;
