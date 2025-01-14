// ===== Internal Imports =====
import BrandsModel from "../model/BrandsModel.js";

// ===== Brands Read Service =====
export const brandsReadService = async (req) => {
  try {
    const brands = await BrandsModel.find({});

    if (!brands) {
      return { status: "Failed", data: "Brands not Found" };
    }

    return { status: "Successful", data: brands };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};
