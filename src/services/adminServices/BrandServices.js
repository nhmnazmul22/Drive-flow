// ===== Internal Imports =====
import mongoose from "mongoose";
import BrandsModel from "../../model/BrandsModel.js";

// ===== Brand Create Service =====
export const brandCreateService = async (req) => {
  try {
    const reqBody = req.body;

    // Checking request body
    if (!reqBody) {
      return { status: "Failed", data: "Please, Input all filed" };
    }

    // Create a Brand
    await BrandsModel.updateOne(reqBody, { $set: reqBody }, { upsert: true });

    return { status: "Successful", data: "Brand Created Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Brand Update Service =====
export const brandUpdateService = async (req) => {
  try {
    const brandID = new mongoose.Types.ObjectId(req.params.brandID);
    const reqBody = req.body;

    // Checking request body
    if (!reqBody) {
      return { status: "Failed", data: "Please, Input all filed." };
    }

    // Checking brand id
    if (!brandID) {
      return { status: "Failed", data: "Something went wrong" };
    }

    // Update a brand
    await BrandsModel.updateOne({ _id: brandID }, { $set: reqBody });

    return { status: "Successful", data: "Brand Updated Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Brands Read Service =====
export const brandsReadService = async (req) => {
  try {
    // Find the brands
    const brands = await BrandsModel.find({});

    if (!brands) {
      return { status: "Failed", data: "Brands not Found" };
    }

    return { status: "Successful", data: brands };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Brand Read Service =====
export const brandReadService = async (req) => {
  try {
    const brandID = new mongoose.Types.ObjectId(req.params.brandID);

    // Find the brand
    const brand = await BrandsModel.findOne({ _id: brandID });

    if (!brand) {
      return { status: "Failed", data: "Brand not Found" };
    }

    return { status: "Successful", data: brand };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Brands Read Service =====
export const brandRemoveService = async (req) => {
  try {
    const brandID = new mongoose.Types.ObjectId(req.params.brandID);

    // Find the brand
    const brand = await BrandsModel.findOne({ _id: brandID });

    if (!brand) {
      return { status: "Failed", data: "Brand not Found" };
    }

    // Remove the brand
    await BrandsModel.deleteOne({ _id: brandID });

    return { status: "Successful", data: "Brand Remove Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};
