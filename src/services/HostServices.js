import bcrypt from "bcrypt";
import mongoose from "mongoose";
// ===== Internal Imports =====
import HostsModel from "../model/HostsModel.js";
import { TokenEncoded } from "../utility/TokenUtility.js";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../utility/Validation.js";
// import { sendVerificationEmail } from "../utility/VerifyEmail.js";

// ===== Host Signup Service =====
export const signupHostService = async (req) => {
  try {
    const reqBody = req.body;

    // Checking Request Body
    if (!reqBody) {
      return { status: "Failed", data: "Please, Input Something" };
    }

    // Create Host Full Name
    let hostFullName = "";
    if (reqBody["firstName"] || reqBody["lastName"]) {
      hostFullName = `${reqBody["firstName"]} ${reqBody["lastName"]}`;
    }

    // Check the valid phone number
    let isValidPhone = false;
    if (reqBody["phone"]) {
      isValidPhone = validatePhoneNumber(reqBody["phone"]);
    }

    // Check the valid Email Address
    let isValidEmail = false;
    if (reqBody["email"]) {
      isValidEmail = validateEmail(reqBody["email"]);
    }

    // Check the valid Password
    let isValidPassword = false;
    if (reqBody["password"] === reqBody["confirmPassword"]) {
      isValidPassword = validatePassword(reqBody["password"]);
    }

    // bcrypt the valid password
    let bcryptPassword = "";
    if (isValidPassword) {
      bcryptPassword = await bcrypt.hash(reqBody["password"], 14);
    }

    if (!hostFullName && !isValidPhone && !isValidEmail && !bcryptPassword) {
      return { status: "Failed", data: "Please, Input all field correctly" };
    }

    // Remove the confirm password from Host signup data
    const { confirmPassword, ...hostInfo } = reqBody;

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send the mail
    // await sendVerificationEmail(reqBody.email, otp);

    const user = {
      ...hostInfo,
      fullName: hostFullName,
      password: bcryptPassword,
      otp: otp,
    };

    // Checking User Already Exist or Not
    const prevHost = await HostsModel.findOne({ email: user.email });
    if (prevHost) {
      return { status: "Failed", data: "User Already Exist in Server" };
    }

    const response = await HostsModel.create(user);
    return {
      status: "Successful",
      data: "Check your Email address to verify",
    };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Host Verification Service =====
export const verifyHostService = async (req) => {
  try {
    const reqBody = req.body;
    const email = req.params.email;

    if (!reqBody) {
      return { status: "Failed", data: "Please, input the write OTP Code" };
    }

    const host = await HostsModel.findOne({
      email: email,
      otp: reqBody["otp"],
    });

    if (!host) {
      return { status: "Failed", data: "Please, Input a Valid OTP Code" };
    }

    await HostsModel.updateOne(
      { email: email },
      {
        $set: { isEmailVerified: true },
      }
    );
    return {
      status: "Successful",
      data: "Verification Successful. Please, Login now",
    };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Host Login Service =====
export const loginHostService = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation request Body
    if (!email && !password) {
      return {
        status: "Failed",
        data: "Email and Password Required",
      };
    }

    // Find Host by Email
    const host = await HostsModel.findOne({ email });
    if (!host) {
      return {
        status: "Failed",
        data: "User not found in server",
      };
    }

    // Compare hashed password with Host provided password
    const isPasswordValid = await bcrypt.compare(password, host.password);

    if (!isPasswordValid) {
      return {
        status: "Failed",
        data: "Wrong Password, Please, input valid password",
      };
    }

    // Generate JWT token
    const token = TokenEncoded(host._id, host.email);

    // Set token in a secure HTTP-only cookie
    res.cookie("hostToken", token, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });

    // Send success response
    return {
      status: "Successful",
      message: "Login successful.",
      data: token,
    };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Host Read Service =====
export const readHostService = async (req) => {
  try {
    const hostID = new mongoose.Types.ObjectId(req.headers.hostID);
    const email = req.headers.email;

    // Validation of request header items
    if (!hostID && !email) {
      return { status: "Failed", data: "Something went wrong." };
    }

    // Find the Host @TODO- Aggregation need
    const host = await HostsModel.findOne(
      { _id: hostID, email: email },
      { password: 0, otp: 0 }
    );

    // Checking Host is here in server or not
    if (!host) {
      return { status: "Failed", data: "Something went wrong." };
    }

    if (!host.isEmailVerified) {
      return { status: "Failed", data: "Host email not verified" };
    }

    return { status: "Successful", data: host };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Hosts Read Service =====
export const readHostsService = async (req) => {
  try {
    // Find the Hosts
    const hosts = await HostsModel.find(
      {},
      { fullName: 1, img: 1, about: 1, rating: 1, tripsCompleted: 1 }
    ).limit(10);

    // Checking Host is here in server or not
    if (!hosts) {
      return { status: "Failed", data: "Something went wrong." };
    }

    return { status: "Successful", data: hosts };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Host Update Service =====
export const updateHostService = async (req) => {
  try {
    const reqBody = req.body;
    const hostID = new mongoose.Types.ObjectId(req.headers.hostID);
    const email = req.headers.email;

    // Validation of request header items
    if (!hostID && !email) {
      return { status: "Failed", data: "Something went wrong." };
    }

    // Find the Host
    const host = await HostsModel.findOne({ _id: hostID, email: email });

    // Checking Host is here in server or not
    if (!host) {
      return { status: "Failed", data: "Something went wrong." };
    }

    // Update the Host
    const updateInfo = await HostsModel.updateOne(
      { _id: hostID, email: email },
      { $set: reqBody }
    );

    return { status: "Successful", data: updateInfo };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Host Logout Service =====
export const logoutHostService = async (req, res) => {
  try {
    const hostID = new mongoose.Types.ObjectId(req.headers.hostID);
    const email = req.headers.email;

    // Validation of request header items
    if (!hostID && !email) {
      return { status: "Failed", data: "Something went wrong." };
    }

    // Find the Host
    const user = await HostsModel.findOne({ _id: hostID, email: email });

    // Checking Host is here in server or not
    if (!user) {
      return { status: "Failed", data: "Something went wrong." };
    }

    // Logout the Host
    res.clearCookie("hostToken");

    return { status: "Successful", data: "User Logout Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};


// ===== User Remove Service =====
export const removeHostService = async (req, res) => {
  try {
    const hostID = new mongoose.Types.ObjectId(req.headers.hostID);
    const email = req.headers.email;

    // Validation of request header items
    if (!hostID && !email) {
      return { status: "Failed", data: "Something went wrong." };
    }

    // Find the Host
    const host = await HostsModel.findOne({ _id: hostID, email: email });

    // Checking Host is here in server or not
    if (!host) {
      return { status: "Failed", data: "Something went wrong." };
    }

    // Delete the Host
    const deleteInfo = await HostsModel.deleteOne({
      _id: hostID,
      email: email,
    });

    // Logout the Host
    res.clearCookie("hostToken");

    return { status: "Successful", data: deleteInfo };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};


