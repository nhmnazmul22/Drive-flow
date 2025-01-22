// Internal Imports
import * as AdminServices from "../../services/adminServices/AdminServices.js";

// ======= Admin signup controller =======
export const signupAdmin = async (req, res) => {
  const result = await AdminServices.signupAdminService(req);
  return res.json(result);
};

// ======= Admin Verify controller =======
export const verifyAdmin = async (req, res) => {
  const result = await AdminServices.verifyAdminService(req);
  return res.json(result);
};

// ======= Admin Login controller =======
export const loginAdmin = async (req, res) => {
  const result = await AdminServices.loginAdminService(req, res);
  return res.json(result);
};

// ======= Admin Read controller =======
export const readAdmin = async (req, res) => {
  const result = await AdminServices.readAdminService(req);
  return res.json(result);
};

// ======= Admin Update controller =======
export const updateAdmin = async (req, res) => {
  const result = await AdminServices.updateAdminService(req);
  return res.json(result);
};

// ======= Admin logout controller =======
export const logoutAdmin = async (req, res) => {
  const result = await AdminServices.logoutAdminService(req, res);
  return res.json(result);
};
