// ===== External Imports =====
import mongoose from "mongoose";

// ===== Define Specification Schema =====
const specificationSchema = new mongoose.Schema({
  petrolType: { type: String, required: true },
  carType: { type: String, required: true },
  person: { type: String, required: true },
  year: { type: String, required: true },
});

// ===== Define Insurance Schema =====
const insuranceSchema = new mongoose.Schema({
  type: { type: String, required: true },
  provider: { type: String, required: true },
  coverageAmount: { type: String, required: true },
  deductible: { type: String, required: true },
});

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
    thumbnail: { type: String, required: true },
    carImg01: { type: String, required: true },
    carImg02: { type: String, required: true },
    carImg03: { type: String, required: true },
    title: { type: String, required: true },
    tripsCompleted: { type: Number, default: 0, required: true },
    status: { type: String, required: true },
    perDayPrice: { type: String, required: true },
    specification: { type: specificationSchema, required: true },
    presentLocation: { type: String, required: true },
    insurance: { type: insuranceSchema, required: true },
    features: { type: [String], required: true },
    description: { type: String, required: true },
    rating: { type: String, required: true },
    ratingProgress: { type: ratingProgressSchema, required: true },
    hosterID: { type: mongoose.Types.ObjectId, required: true },
  },
  { timestamps: true, versionKey: false }
);

// ===== Define Model =====
const CarsModel = mongoose.model("cars", DataSchema);

// ===== export Model =====
export default CarsModel;
