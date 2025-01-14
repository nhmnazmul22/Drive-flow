// ===== Internal Imports =====
import ServiceModel from "../model/ServicesModel.js";

// ===== Services Read Service =====
export const servicesReadService = async (req) => {
  try {
    const services = await ServiceModel.find({});

    if (!services) {
      return { status: "Failed", data: "Services not Found" };
    }

    return { status: "Successful", data: services };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};
