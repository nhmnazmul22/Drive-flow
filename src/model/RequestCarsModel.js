// ===== External Imports =====
import mongoose from "mongoose";

// ===== Define Data Schema =====
const DataSchema = new mongoose.Schema(
  {
    pickupLocation: { type: String, required: true },
    dropoffLocation: { type: String, required: true },
    pickupDateTime: { type: String, required: true },
    dropoffDateTime: { type: String, required: true },
    numberOfPassenger: { type: String, required: true },
    contactInfo: {
      type: {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        alternativePhone: { type: String },
      },
      required: true,
    },
    additionalNotes: { type: String },
    carID: { type: mongoose.Types.ObjectId, required: true },
    userID: { type: mongoose.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false }
);

// ===== Define Model =====
const RequestCarsModel = mongoose.model("requestcars", DataSchema);

// ===== export Model =====
export default RequestCarsModel;
