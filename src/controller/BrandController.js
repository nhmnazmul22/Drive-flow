// ===== Internal Imports =====
import * as BrandServices from "../services/BrandServices.js";

// ==== Read Brands Controller =====
export const readBrands = async (req, res) => {
  const result = await BrandServices.brandsReadService(req);
  return res.json(result);
};
