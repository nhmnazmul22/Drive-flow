// ===== Internal Imports =====
import * as UserServices from "../../services/adminServices/UserServices.js";

// ======= Users Read Controller =======
export const readUsers = async (req, res) => {
  const result = await UserServices.readUsersService(req);
  return res.json(result);
};

// ======= User Read Controller =======
export const readUser = async (req, res) => {
  const result = await UserServices.readUserService(req);
  return res.json(result);
};

// ======= User Remove Controller =======
export const removeUser = async (req, res) => {
  const result = await UserServices.removeUserService(req);
  return res.json(result);
};
