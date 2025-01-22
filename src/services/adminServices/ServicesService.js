// ===== Internal Imports =====
import mongoose from "mongoose";
import ServiceModel from "../../model/ServicesModel.js";

// ===== Services Create Service =====
export const serviceCreateService = async (req) => {
  try {
    const reqBody = req.body;

    // Checking request body
    if (!reqBody) {
      return { status: "Failed", data: "Please, Input all filed." };
    }

    // Create a Service
    await ServiceModel.updateOne(reqBody, { $set: reqBody }, { upsert: true });

    return { status: "Successful", data: "Service Created Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Services Update Service =====
export const serviceUpdateService = async (req) => {
  try {
    const serviceID = new mongoose.Types.ObjectId(req.params.serviceID);
    const reqBody = req.body;

    // Checking request body
    if (!reqBody) {
      return { status: "Failed", data: "Please, Input all filed." };
    }

    // Checking service id
    if (!serviceID) {
      return { status: "Failed", data: "Something went wrong" };
    }

    // Update a Service
    await ServiceModel.updateOne({ _id: serviceID }, { $set: reqBody });

    return { status: "Successful", data: "Service Updated Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Services Read Service =====
export const servicesReadService = async (req) => {
  try {
    // Find the services
    const services = await ServiceModel.find({});

    if (!services) {
      return { status: "Failed", data: "Services not Found" };
    }

    return { status: "Successful", data: services };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Service Read Service =====
export const serviceReadService = async (req) => {
  try {
    const serviceID = new mongoose.Types.ObjectId(req.params.serviceID);

    // Find the service
    const service = await ServiceModel.findOne({ _id: serviceID });

    if (!service) {
      return { status: "Failed", data: "Service not Found" };
    }

    return { status: "Successful", data: service };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Service Read Service =====
export const serviceRemoveService = async (req) => {
  try {
    const serviceID = new mongoose.Types.ObjectId(req.params.serviceID);

    // Find the service
    const service = await ServiceModel.findOne({ _id: serviceID });

    if (!service) {
      return { status: "Failed", data: "Service not Found" };
    }

    // Remove the Service
    await ServiceModel.deleteOne({ _id: serviceID });

    return { status: "Successful", data: "Service Remove Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};
