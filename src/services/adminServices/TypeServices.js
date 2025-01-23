// ===== Internal Imports =====
import mongoose from "mongoose";
import TypesModel from "../../model/TypesModel.js";

// ===== Type Create Service =====
export const typeCreateService = async (req) => {
  try {
    const reqBody = req.body;

    // Checking request body
    if (!reqBody) {
      return { status: "Failed", data: "Please, Input all filed" };
    }

    // Create a Type
    await TypesModel.updateOne(reqBody, { $set: reqBody }, { upsert: true });

    return { status: "Successful", data: "Type Created Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Type Update Service =====
export const typeUpdateService = async (req) => {
  try {
    const typeID = new mongoose.Types.ObjectId(req.params.typeID);
    const reqBody = req.body;

    // Checking request body
    if (!reqBody) {
      return { status: "Failed", data: "Please, Input all filed." };
    }

    // Checking type id
    if (!typeID) {
      return { status: "Failed", data: "Something went wrong" };
    }

    // Update a type
    await TypesModel.updateOne({ _id: typeID }, { $set: reqBody });

    return { status: "Successful", data: "Type Updated Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Types Read Service =====
export const typesReadService = async (req) => {
  try {
    // Find the types
    const types = await TypesModel.find({});

    if (!types) {
      return { status: "Failed", data: "Types not Found" };
    }

    return { status: "Successful", data: types };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Type Read Service =====
export const typeReadService = async (req) => {
  try {
    const typeID = new mongoose.Types.ObjectId(req.params.typeID);

    // Find the type
    const type = await TypesModel.findOne({ _id: typeID });

    if (!type) {
      return { status: "Failed", data: "Type not Found" };
    }

    return { status: "Successful", data: type };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Type Read Service =====
export const typeRemoveService = async (req) => {
  try {
    const typeID = new mongoose.Types.ObjectId(req.params.typeID);

    // Find the brand
    const type = await TypesModel.findOne({ _id: typeID });

    if (!type) {
      return { status: "Failed", data: "Type not Found" };
    }

    // Remove the brand
    await TypesModel.deleteOne({ _id: type });

    return { status: "Successful", data: "Type Remove Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};
