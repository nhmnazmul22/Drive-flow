import bcrypt from "bcrypt";
import mongoose from "mongoose";

// ===== Internal Imports =====
import UsersModel from "../model/UsersModel.js";
import { TokenEncoded } from "../utility/TokenUtility.js";
import {
  validateEmail,
  validatePassword,
  validatePhoneNumber,
} from "../utility/Validation.js";
import { sendVerificationEmail } from "../utility/VerifyEmail.js";

// ===== User Signup Service =====
export const signupUserService = async (req) => {
  try {
    const reqBody = req.body;
    if (reqBody) {
      // Create user Full Name
      let userFullName = "";
      if (reqBody["firstName"] || reqBody["lastName"]) {
        userFullName = `${reqBody["firstName"]} ${reqBody["lastName"]}`;
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

      if (userFullName && isValidPhone && isValidEmail && bcryptPassword) {
        const { confirmPassword, ...userInfo } = reqBody;

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Send the mail
        await sendVerificationEmail(reqBody.email, otp);

        const user = {
          ...userInfo,
          fullName: userFullName,
          password: bcryptPassword,
          otp: otp,
        };

        // Checking User Already Exist or Not
        const prevUser = await UsersModel.findOne({ email: user.email });
        if (!prevUser) {
          const response = await UsersModel.create(user);
          return {
            status: "Successful",
            data: "Check your Email address to verify",
          };
        } else {
          return { status: "Failed", data: "User Already Exist in Server" };
        }
      } else {
        return { status: "Failed", data: "Please, Input all field correctly" };
      }
    } else {
      return { status: "Failed", data: "Please, Input Something" };
    }
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== User Verification Service =====
export const verifyUserService = async (req) => {
  try {
    const reqBody = req.body;
    const email = req.params.email;

    if (reqBody) {
      const user = await UsersModel.findOne({
        email: email,
        otp: reqBody["otp"],
      });

      if (user) {
        await UsersModel.updateOne(
          { email: email },
          {
            $set: { isEmailVerified: true },
          }
        );
        return {
          status: "Successful",
          data: "Verification Successful. Please, Login now",
        };
      } else {
        return { status: "Failed", data: "Please, Input a Valid OTP Code" };
      }
    } else {
      return { status: "Failed", data: "Please, input the write OTP Code" };
    }
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== User Login Service =====
export const loginUserService = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation request Body
    if (!email && !password) {
      return {
        status: "Failed",
        data: "Email and Password Required",
      };
    }

    // Find User by Email
    const user = await UsersModel.findOne({ email });
    if (!user) {
      return {
        status: "Failed",
        data: "User not found in server",
      };
    }

    // Compare hashed password with user provided password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        status: "Failed",
        data: "Wrong Password, Please, input valid password",
      };
    }

    // Generate JWT token
    const token = TokenEncoded(user._id, user.email);

    // Set token in a secure HTTP-only cookie
    res.cookie("token", token, {
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
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

// ===== User Read Service =====
export const readUserService = async (req) => {
  try {
    const userID = new mongoose.Types.ObjectId(req.headers.userID);
    const email = req.headers.email;

    // Validation of request header items
    if (!userID && !email) {
      return { status: "Failed", data: "Something went wrong." };
    }

    // Find the user @TODO- Aggregation need
    const user = await UsersModel.findOne(
      { _id: userID, email: email },
      { password: 0, otp: 0 }
    );

    // Checking user is here in server or not
    if (!user) {
      return { status: "Failed", data: "Something went wrong." };
    }

    if (!user.isEmailVerified) {
      return { status: "Failed", data: "User email not verified" };
    }

    return { status: "Successful", data: user };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== User Update Service =====
export const updateUserService = async (req) => {
  try {
    const reqBody = req.body;
    const userID = new mongoose.Types.ObjectId(req.headers.userID);
    const email = req.headers.email;

    // Validation of request header items
    if (!userID && !email) {
      return { status: "Failed", data: "Something went wrong." };
    }

    // Find the user
    const user = await UsersModel.findOne({ _id: userID, email: email });

    // Checking user is here in server or not
    if (!user) {
      return { status: "Failed", data: "Something went wrong." };
    }

    // Update the user
    const updateInfo = await UsersModel.updateOne(
      { _id: userID, email: email },
      { $set: reqBody }
    );

    return { status: "Successful", data: updateInfo };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== User Logout Service =====
export const logoutUserService = async (req, res) => {
  try {
    const userID = new mongoose.Types.ObjectId(req.headers.userID);
    const email = req.headers.email;

    // Validation of request header items
    if (!userID && !email) {
      return { status: "Failed", data: "Something went wrong." };
    }

    // Find the user
    const user = await UsersModel.findOne({ _id: userID, email: email });

    // Checking user is here in server or not
    if (!user) {
      return { status: "Failed", data: "Something went wrong." };
    }

    // Logout the user
    res.clearCookie("token");

    return { status: "Successful", data: "User Logout Successful" };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

// ===== User Remove Service =====
export const removeUserService = async (req, res) => {
  try {
    const userID = new mongoose.Types.ObjectId(req.headers.userID);
    const email = req.headers.email;

    // Validation of request header items
    if (!userID && !email) {
      return { status: "Failed", data: "Something went wrong." };
    }

    // Find the user
    const user = await UsersModel.findOne({ _id: userID, email: email });

    // Checking user is here in server or not
    if (!user) {
      return { status: "Failed", data: "Something went wrong." };
    }

    // Delete the user
    const deleteInfo = await UsersModel.deleteOne({
      _id: userID,
      email: email,
    });

    // Logout the user
    res.clearCookie("token");

    return { status: "Successful", data: deleteInfo };
  } catch (err) {
    return { status: "Failed", data: err.toString() };
  }
};

