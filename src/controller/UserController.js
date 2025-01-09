// ===== Internal Imports =====
import * as UserServices from "../services/UserServices.js";

// ======= User signupUser Controller =======
export const signupUser = async (req, res) => {
  const result = await UserServices.signupUserService(req);
  return res.json(result);
};

// ======= User Verify Controller =======
export const verifyUser = async (req, res) => {
  const result = await UserServices.verifyUserService(req);
  return res.json(result);
};

// ======= User Login Controller =======
export const loginUser = async (req, res) => {
  const result = await UserServices.loginUserService(req, res);
  return res.json(result);
};
