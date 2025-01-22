import mongoose from "mongoose";

// ===== Internal Imports =====
import UsersModel from "../../model/UsersModel.js";

// ===== Users Read Service =====
export const readUsersService = async (req) => {
  try {
    // Find the users
    const users = await UsersModel.find({});

    // Checking users is here in server or not
    if (!users) {
      return { status: "Failed", data: "Users not found" };
    }

    return { status: "Successful", data: users };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== User Read Service =====
export const readUserService = async (req) => {
  try {
    const userID = new mongoose.Types.ObjectId(req.params.userID);

    // Find the users
    const user = await UsersModel.findOne({ _id: userID });

    // Checking users is here in server or not
    if (!user) {
      return { status: "Failed", data: "User not found" };
    }

    return { status: "Successful", data: user };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== User Remove Service =====
export const removeUserService = async (req, res) => {
  try {
    const userID = new mongoose.Types.ObjectId(req.params.userID);

    // Find the user
    const user = await UsersModel.findOne({ _id: userID });

    // Checking user is here in server or not
    if (!user) {
      return { status: "Failed", data: "Something went wrong." };
    }

    // Delete the user
    const deleteInfo = await UsersModel.deleteOne({ _id: userID });

    return { status: "Successful", data: deleteInfo };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};
