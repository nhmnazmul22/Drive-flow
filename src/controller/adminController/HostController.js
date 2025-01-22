// ==== Internal Imports =====
import * as HostServices from "../../services/adminServices/HostServices.js";

// ======= Hosts Read Controller =======
export const readHosts = async (req, res) => {
  const result = await HostServices.readHostsService(req);
  return res.json(result);
};

// ======= Host Read Controller =======
export const readHost = async (req, res) => {
  const result = await HostServices.readHostService(req);
  return res.json(result);
};

// ======= Host Remove Controller =======
export const removeHost = async (req, res) => {
  const result = await HostServices.removeHostService(req);
  return res.json(result);
};