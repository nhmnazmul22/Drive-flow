import bcrypt from "bcrypt";
import mongoose from "mongoose";
// ===== Internal Imports =====
import AdminsModel from "../../model/AdminsModel.js";
import { TokenEncoded } from "../../utility/TokenUtility.js";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../../utility/Validation.js";

// ===== Admin Signup Service =====
export const signupAdminService = async (req) => {
  try {
    const reqBody = req.body;

    // Checking reqBody
    if (!reqBody) {
      return { status: "Failed", data: "Please, Input All Filed" };
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

    if (!isValidPhone && !isValidEmail && !bcryptPassword) {
      return { status: "Failed", data: "Please, Input all field correctly" };
    }

    const { confirmPassword, ...adminInfo } = reqBody;

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Send the mail
    // await sendVerificationEmail(reqBody.email, otp);

    const admin = {
      ...adminInfo,
      password: bcryptPassword,
      otp: otp,
    };

    // Checking Admin Already Exist or Not
    const prevAdmin = await AdminsModel.findOne({ email: admin.email });
    if (prevAdmin) {
      return { status: "Failed", data: "Admin Already Exist in Server" };
    }

    const response = await AdminsModel.create(admin);

    return {
      status: "Successful",
      data: "Check your Email address to verify",
    };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Admin Verification Service =====
export const verifyAdminService = async (req) => {
  try {
    const reqBody = req.body;
    const email = req.params.email;

    // Checking Request Body
    if (!reqBody) {
      return { status: "Failed", data: "Please, input the write OTP Code" };
    }

    const admin = await AdminsModel.findOne({
      email: email,
      otp: reqBody["otp"],
    });

    if (!admin) {
      return { status: "Failed", data: "Please, Input a Valid OTP Code" };
    }

    await AdminsModel.updateOne(
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

// ===== Admin Login Service =====
export const loginAdminService = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation request Body
    if (!email && !password) {
      return {
        status: "Failed",
        data: "Email and Password Required",
      };
    }

    // Find Admin by Email
    const admin = await AdminsModel.findOne({ email });
    if (!admin) {
      return {
        status: "Failed",
        data: "Admin not found in server",
      };
    }

    // Compare hashed password with user provided password
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return {
        status: "Failed",
        data: "Wrong Password, Please, input valid password",
      };
    }

    // Generate JWT token
    const token = TokenEncoded(admin._id, admin.email);

    // Set token in a secure HTTP-only cookie
    res.cookie("adminToken", token, {
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

// ===== Admin Read Service =====
export const readAdminService = async (req) => {
  try {
    const adminID = new mongoose.Types.ObjectId(req.headers.adminID);
    const email = req.headers.email;

    // Validation of request header items
    if (!adminID && !email) {
      return { status: "Failed", data: "Something went wrong." };
    }

    // Find the Admin
    const admin = await AdminsModel.findOne(
      { _id: adminID, email: email },
      { password: 0, otp: 0 }
    );

    // Checking Admin is here in server or not
    if (!admin) {
      return { status: "Failed", data: "Admin not found" };
    }

    if (!admin.isEmailVerified) {
      return { status: "Failed", data: "Please, Verify you email address" };
    }

    return { status: "Successful", data: admin };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Admin Update Service =====
export const updateAdminService = async (req) => {
  try {
    const reqBody = req.body;
    const adminID = new mongoose.Types.ObjectId(req.headers.adminID);
    const email = req.headers.email;

    // Validation of request header items
    if (!adminID && !email) {
      return { status: "Failed", data: "Something went wrong." };
    }

    // Find the Admin
    const admin = await AdminsModel.findOne(
      { _id: adminID, email: email },
      { password: 0, otp: 0 }
    );

    // Checking Admin is here in server or not
    if (!admin) {
      return { status: "Failed", data: "Admin not found" };
    }

    // Checking admin email isVerified or not
    if (!admin.isEmailVerified) {
      return { status: "Failed", data: "Please, Verify you email address" };
    }

    // Checking request body
    if (!reqBody) {
      return { status: "Failed", data: "Please, input something" };
    }

    // Update the Admin
    const data = await AdminsModel.updateOne(
      { _id: adminID, email: email },
      { $set: reqBody }
    );

    return { status: "Successful", data: data };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== Admin Logout Service =====
export const logoutAdminService = async (req, res) => {
  try {
    const adminID = new mongoose.Types.ObjectId(req.headers.adminID);
    const email = req.headers.email;

    // Validation of request header items
    if (!adminID && !email) {
      return { status: "Failed", data: "Something went wrong." };
    }

    // Find the admin
    const admin = await AdminsModel.findOne({ _id: adminID, email: email });

    // Checking admin is here in server or not
    if (!admin) {
      return { status: "Failed", data: "Something went wrong." };
    }

    // Logout the admin
    res.clearCookie("adminToken");

    return { status: "Successful", data: "Admin Logout Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};