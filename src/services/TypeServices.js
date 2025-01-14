// ===== Internal Imports =====
import TypesModel from "../model/TypesModel.js";

// ===== Types Read Service =====
export const typesReadService = async (req) => {
  try {
    const types = await TypesModel.find({});

    if (!types) {
      return { status: "Failed", data: "Types not Found" };
    }

    return { status: "Successful", data: types };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};
