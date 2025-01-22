// ==== Internal Imports ====
import * as BrandServices from "../../services/adminServices/BrandServices.js";

// ==== Create Brand Controller =====
export const createBrand = async (req, res) => {
  const result = await BrandServices.brandCreateService(req);
  return res.json(result);
};

// ==== Update Brand Controller =====
export const updateBrand = async (req, res) => {
  const result = await BrandServices.brandUpdateService(req);
  return res.json(result);
};

// ==== Read Brands Controller =====
export const readBrands = async (req, res) => {
  const result = await BrandServices.brandsReadService(req);
  return res.json(result);
};

// ==== Read Brand Controller =====
export const readBrand = async (req, res) => {
  const result = await BrandServices.brandReadService(req);
  return res.json(result);
};

// ==== Remove Brand Controller =====
export const removeBrand = async (req, res) => {
  const result = await BrandServices.brandRemoveService(req);
  return res.json(result);
};
