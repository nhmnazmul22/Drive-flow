// ===== Internal Imports =====
import * as TypeServices from "../services/TypeServices.js";

// ==== Read Types Controller =====
export const readTypes = async (req, res) => {
  const result = await TypeServices.typesReadService(req);
  return res.json(result);
};
