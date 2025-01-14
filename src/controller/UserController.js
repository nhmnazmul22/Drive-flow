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

// ======= User Read Controller =======
export const readUser = async (req, res) => {
  const result = await UserServices.readUserService(req);
  return res.json(result);
};

// ======= User Update Controller =======
export const updateUser = async (req, res) => {
  const result = await UserServices.updateUserService(req);
  return res.json(result);
};

// ======= User Logout Controller =======
export const logoutUser = async (req, res) => {
  const result = await UserServices.logoutUserService(req, res);
  return res.json(result);
};

// ======= User Remove Controller =======
export const removeUser = async (req, res) => {
  const result = await UserServices.removeUserService(req, res);
  return res.json(result);
};
