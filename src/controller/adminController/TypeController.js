// ==== Internal Imports ====
import * as TypeServices from "../../services/adminServices/TypeServices.js";

// ==== Create Type Controller =====
export const createType = async (req, res) => {
  const result = await TypeServices.typeCreateService(req);
  return res.json(result);
};

// ==== Update Type Controller =====
export const updateType = async (req, res) => {
  const result = await TypeServices.typeUpdateService(req);
  return res.json(result);
};

// ==== Read Types Controller =====
export const readTypes = async (req, res) => {
  const result = await TypeServices.typesReadService(req);
  return res.json(result);
};

// ==== Read Type Controller =====
export const readType = async (req, res) => {
  const result = await TypeServices.typeReadService(req);
  return res.json(result);
};

// ==== Remove Type Controller =====
export const removeType = async (req, res) => {
  const result = await TypeServices.typeRemoveService(req);
  return res.json(result);
};
