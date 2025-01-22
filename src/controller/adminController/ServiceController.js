// ==== Internal Imports ====
import * as ServicesService from "../../services/adminServices/ServicesService.js"

// ==== Create Services Controller =====
export const  createService = async (req, res) => {
  const result = await ServicesService.serviceCreateService(req);
  return res.json(result);
};


// ==== Update Services Controller =====
export const  updateService = async (req, res) => {
  const result = await ServicesService.serviceUpdateService(req);
  return res.json(result);
};


// ==== Read Services Controller =====
export const readServices = async (req, res) => {
  const result = await ServicesService.servicesReadServicer(req);
  return res.json(result);
};

// ==== Read Service Controller =====
export const readService = async (req, res) => {
  const result = await ServicesService.serviceReadService(req);
  return res.json(result);
};

// ==== Remove Service Controller =====
export const removeService = async (req, res) => {
  const result = await ServicesService.serviceRemoveService(req);
  return res.json(result);
};
