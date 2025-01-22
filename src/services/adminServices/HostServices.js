import mongoose from "mongoose";
// ==== Internal Imports ====
import HostsModel from "../../model/HostsModel.js";

// ===== Hosts Read Service =====
export const readHostsService = async (req) => {
  try {
    // Find the Hosts
    const hosts = await HostsModel.find({});

    // Checking Host is here in server or not
    if (!hosts) {
      return { status: "Failed", data: "Hosts not found" };
    }

    return { status: "Successful", data: hosts };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Host Read Service =====
export const readHostService = async (req) => {
  try {
    const hostID = new mongoose.Types.ObjectId(req.params.hostID);

    // Find the Host
    const host = await HostsModel.findOne(
      { _id: hostID },
      { password: 0, otp: 0 }
    );

    // Checking Host is here in server or not
    if (!host) {
      return { status: "Failed", data: "Host not found" };
    }

    return { status: "Successful", data: host };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Host Remove Service =====
export const removeHostService = async (req) => {
  try {
    const hostID = new mongoose.Types.ObjectId(req.params.hostID);

    // Find the Host
    const host = await HostsModel.findOne({ _id: hostID });

    // Checking Host is here in server or not
    if (!host) {
      return { status: "Failed", data: "Host not found" };
    }

    // Remove the host form server/database
    await HostsModel.deleteOne({ _id: hostID })

    return { status: "Successful", data: "Host Remove Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};
