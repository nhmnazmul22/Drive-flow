// ===== Internal Imports =====
import * as HostServices from "../services/HostServices.js";

// ======= Host signup Controller =======
export const signupHost = async (req, res) => {
  const result = await HostServices.signupHostService(req);
  return res.json(result);
};

// ======= Host Verify Controller =======
export const verifyHost = async (req, res) => {
  const result = await HostServices.verifyHostService(req);
  return res.json(result);
};

// ======= Host Login Controller =======
export const loginHost = async (req, res) => {
  const result = await HostServices.loginHostService(req, res);
  return res.json(result);
};

// ======= Host Read Controller =======
export const readHost = async (req, res) => {
  const result = await HostServices.readHostService(req);
  return res.json(result);
};

// ======= Hosts Read Controller =======
export const readHosts = async (req, res) => {
  const result = await HostServices.readHostsService(req);
  return res.json(result);
};

// ======= Host Update Controller =======
export const updateHosts = async (req, res) => {
  const result = await HostServices.updateHostService(req);
  return res.json(result);
};

// ======= Host Logout Controller =======
export const logoutHost = async (req, res) => {
  const result = await HostServices.logoutHostService(req, res);
  return res.json(result);
};

// ======= Host Remove Controller =======
export const removeHost = async (req, res) => {
  const result = await HostServices.removeHostService(req, res);
  return res.json(result);
};
