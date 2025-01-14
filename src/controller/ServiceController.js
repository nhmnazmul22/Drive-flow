// ===== Internal Imports =====
import * as ServicesService from "../services/ServicesService.js";

// ==== Read Services Controller =====
export const readServices = async (req, res) => {
  const result = await ServicesService.servicesReadService(req);
  return res.json(result);
};
